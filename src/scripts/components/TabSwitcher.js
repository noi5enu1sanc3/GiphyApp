export default class TabSwitcher {
  constructor({ contentSelector, tabSelector, activeTabClass, visuallyHiddenClass }, currentTabSelector, currentSectionSelector, actionHandler) {
    this._sections = document.querySelectorAll(contentSelector);
    this._tabs = document.querySelectorAll(tabSelector);
    this._visuallyHiddenClass = visuallyHiddenClass;
    this._activeTabClass = activeTabClass;

    this._currentTab = document.querySelector(currentTabSelector);
    this._currentSection = document.querySelector(currentSectionSelector);
    this._actionHandler = actionHandler;
  }

  _hideAllContent() {
    this._sections.forEach(section => section.classList.add(this._visuallyHiddenClass))
  }

  _setAllTabsInactive() {
    this._tabs.forEach(tab => tab.classList.remove(this._activeTabClass))
  }

  showSection() {
    this._hideAllContent();
    this._setAllTabsInactive();
    this._currentTab.classList.add(this._activeTabClass);
    this._currentSection.classList.remove(this._visuallyHiddenClass);
  }

  setEventListeners() {
    this._currentTab.addEventListener('click', this._actionHandler.bind(this))
  }
}
