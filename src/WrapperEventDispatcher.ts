interface BreadcrumbItem {
  name: string;
  url: string;
}

interface UserInfo {
  [key: string]: any;
}

interface NavigationContextDetail {
  pageTitle?: string;
  breadcrumbStack?: BreadcrumbItem[] | null;
  userInfo?: UserInfo;
}

export default class WrapperEventDispatcher {
  private pageTitle?: string;
  private breadcrumbStack?: BreadcrumbItem[] | null;
  private userInfo?: UserInfo;

  /**
   * Class to standardize communications with the web component's parent page.
   * ABCMS will listen for the event dispatched in the dispatch() method and update
   * the wrapper UI accordingly.
   *
   * @param {string | undefined} pageTitle - What should be displayed in the page's H1 tag. Will not be updated if null.
   * @param {BreadcrumbItem[] | null} breadcrumbStack - An array of items {name, url} that should be presented as breadcrumbs. Not updated when null.
   * @param {UserInfo} userInfo - Any object that should bubble up to the wrapper.
   */
  constructor(
    pageTitle?: string,
    breadcrumbStack?: BreadcrumbItem[] | null,
    userInfo?: UserInfo
  ) {
    this.pageTitle = pageTitle;
    this.breadcrumbStack = breadcrumbStack;
    this.userInfo = userInfo;
  }

  static dispatch(
    pageTitle?: string,
    breadcrumbStack?: BreadcrumbItem[] | null,
    userInfo?: UserInfo
  ) {
    const event = new CustomEvent<NavigationContextDetail>(
      "navigation-context-update",
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
          pageTitle,
          breadcrumbStack,
          userInfo,
        },
      }
    );
    document.dispatchEvent(event);
  }

  dispatch() {
    WrapperEventDispatcher.dispatch(
      this.pageTitle,
      this.breadcrumbStack,
      this.userInfo
    );
  }
}
