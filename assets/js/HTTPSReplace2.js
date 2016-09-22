
class HTTPSReplace {

  static verifyOrigin() {
    const baseURL = 'https://www.blippics.com/';
    if (window.location.origin != baseURL) {
      window.location.replace(baseURL);
    }
  }

}

window.onload = HTTPSReplace.verifyOrigin();
