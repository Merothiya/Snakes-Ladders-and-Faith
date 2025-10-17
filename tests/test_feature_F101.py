import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Base URL for the application
BASE_URL = "http://127.0.0.1:5500/index.html"  # Assuming a local server or direct file access

@pytest.fixture(scope="module")
def driver():
    # Setup WebDriver (using Chrome for this example)
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless') # Uncomment to run in headless mode
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=options)
    driver.set_window_size(1920, 1080)
    yield driver
    driver.quit()

@pytest.fixture(autouse=True)
def setup_and_teardown(driver):
    driver.get(BASE_URL)
    driver.execute_script("localStorage.clear();") # Clear local storage before each test
    driver.refresh()
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    yield

def test_dark_mode_toggle(driver):
    body = driver.find_element(By.TAG_NAME, "body")
    theme_toggle = driver.find_element(By.ID, "theme-toggle")
    label = driver.find_element(By.CSS_SELECTOR, 'label[for="theme-toggle"]')

    # Initial state: Should be light mode by default (or after clearing storage)
    assert "dark-mode" not in body.get_attribute("class")
    assert not theme_toggle.is_selected()
    assert label.text == "Dark Mode"

    # Toggle to dark mode
    theme_toggle.click()
    WebDriverWait(driver, 5).until(EC.class_to_be_present_in_element((By.TAG_NAME, "body"), "dark-mode"))
    assert "dark-mode" in body.get_attribute("class")
    assert theme_toggle.is_selected()
    assert label.text == "Light Mode"

    # Toggle back to light mode
    theme_toggle.click()
    WebDriverWait(driver, 5).until_not(EC.class_to_be_present_in_element((By.TAG_NAME, "body"), "dark-mode"))
    assert "dark-mode" not in body.get_attribute("class")
    assert not theme_toggle.is_selected()
    assert label.text == "Dark Mode"

def test_dark_mode_persistence(driver):
    theme_toggle = driver.find_element(By.ID, "theme-toggle")
    body = driver.find_element(By.TAG_NAME, "body")

    # Toggle to dark mode
    theme_toggle.click()
    WebDriverWait(driver, 5).until(EC.class_to_be_present_in_element((By.TAG_NAME, "body"), "dark-mode"))
    assert "dark-mode" in body.get_attribute("class")

    # Refresh the page to check persistence
    driver.refresh()
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    body = driver.find_element(By.TAG_NAME, "body") # Re-fetch body after refresh
    theme_toggle = driver.find_element(By.ID, "theme-toggle") # Re-fetch toggle

    assert "dark-mode" in body.get_attribute("class")
    assert theme_toggle.is_selected()

    # Toggle to light mode and check persistence
    theme_toggle.click()
    WebDriverWait(driver, 5).until_not(EC.class_to_be_present_in_element((By.TAG_NAME, "body"), "dark-mode"))
    assert "dark-mode" not in body.get_attribute("class")

    driver.refresh()
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    body = driver.find_element(By.TAG_NAME, "body")
    theme_toggle = driver.find_element(By.ID, "theme-toggle")

    assert "dark-mode" not in body.get_attribute("class")
    assert not theme_toggle.is_selected()

def test_navigation_bar_presence(driver):
    navbar = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "navbar"))
    )
    assert navbar.is_displayed()

    # Check for brand and links
    brand = navbar.find_element(By.CLASS_NAME, "nav-brand")
    assert brand.is_displayed()
    assert brand.text == "Snakes & Ladders"

    nav_links = navbar.find_elements(By.CSS_SELECTOR, ".nav-links a")
    assert len(nav_links) >= 2 # Home and Features
    assert nav_links[0].text == "Home"
    assert nav_links[1].text == "Features"

def test_github_link(driver):
    github_link = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "github-link"))
    )
    assert github_link.is_displayed()
    assert github_link.text == "GitHub"
    assert github_link.get_attribute("href") == "https://github.com/your-github-profile"
    assert github_link.get_attribute("target") == "_blank"
    assert github_link.get_attribute("rel") == "noopener noreferrer"

    # Click the link and verify a new tab/window is opened (basic check)
    original_window = driver.current_window_handle
    github_link.click()

    # Wait for a new window or tab to open
    WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(2))

    # Switch to the new window
    new_window = [window for window in driver.window_handles if window != original_window][0]
    driver.switch_to.window(new_window)

    # Verify the URL (can't always verify exact external URL due to redirects, but check it's not the original)
    # For a more robust test, one might check for elements on the GitHub page, but that's beyond scope for now.
    assert "github.com" in driver.current_url

    # Close the new window and switch back
    driver.close()
    driver.switch_to.window(original_window)
    assert driver.current_url == BASE_URL

def test_ui_components_dark_mode_styling(driver):
    body = driver.find_element(By.TAG_NAME, "body")
    theme_toggle = driver.find_element(By.ID, "theme-toggle")

    # Ensure initially in light mode
    assert "dark-mode" not in body.get_attribute("class")

    # Check initial light mode styles (example: body background)
    assert driver.execute_script("return getComputedStyle(document.body).backgroundColor") == "rgb(163, 177, 138)"

    # Toggle to dark mode
    theme_toggle.click()
    WebDriverWait(driver, 5).until(EC.class_to_be_present_in_element((By.TAG_NAME, "body"), "dark-mode"))

    # Check dark mode styles for various elements
    assert driver.execute_script("return getComputedStyle(document.body).backgroundColor") == "rgb(44, 62, 80)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('h1')).color") == "rgb(236, 240, 241)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('#result')).color") == "rgb(189, 195, 199)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('.navbar')).backgroundColor") == "rgb(26, 36, 47)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('.canvas-container')).backgroundColor") == "rgb(60, 84, 107)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('#start')).backgroundColor") == "rgb(0, 123, 255)"

    # Toggle back to light mode
    theme_toggle.click()
    WebDriverWait(driver, 5).until_not(EC.class_to_be_present_in_element((By.TAG_NAME, "body"), "dark-mode"))

    # Check light mode styles again
    assert driver.execute_script("return getComputedStyle(document.body).backgroundColor") == "rgb(163, 177, 138)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('h1')).color") == "rgb(51, 51, 51)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('#result')).color") == "rgb(85, 85, 85)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('.navbar')).backgroundColor") == "rgb(52, 73, 94)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('.canvas-container')).backgroundColor") == "rgb(240, 240, 240)"
    assert driver.execute_script("return getComputedStyle(document.querySelector('#start')).backgroundColor") == "rgb(40, 167, 69)"
