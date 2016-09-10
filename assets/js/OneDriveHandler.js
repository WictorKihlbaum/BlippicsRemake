'use strict';

const OneDriveHandler = {

  signInURL: 'https://login.live.com/oauth20_authorize.srf?client_id=c3e33c0d-c915-4e56-bbb5-52c74f7d040e&scope=onedrive.readwrite&response_type=token&redirect_uri=http://localhost:8888',
  token: 'EwAAA61DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAdOfSMBUBnFm6JJ4NDYJhZbkmhwxSpNEUjWLDKiAVcr4wtpOqqL8iSClB/BbL0qH1A7Rk8OkpfzWyEaHaovYu0579vC2MkiSY3moLJU77zKXpWgFPTfg0VgVr3A087e5Fk6Tvr8Ou+KhDz0xzFeeaXX+oeF4EnKEN4gJS3e7kyBHVi+XaQgKSWi+ufn6U2QqIMz5piyT8JncietMdSuYPhDCUk2iHOsqC/lBfnawmOstzOoD5IpAuXM4K3DA4CQqb1tBXkcH2jBrLpCw8yLnyCmNS1TGp6rE4DVnASG51zOpO5QCeZUIN1Ukff/ZTWAqKxhTLhhZoi6qd+B+eldlQycDZgAACMAOzRJaYbZw0AHp/jTcVmVvU8ze6PezWtyL5mOa6BxreO+/c8LrL4qXJmQbqd9+9KhOlZYQ9RhecQjdhZ7ooYmitQxVGquzbibESBCrx5+0+/du83UmuMyPeTAUH5xY4p0ULn9ybWuS+JT6tIRPRvR+lb2shT98Jb96IGGLj1XtZBoXtKh28UFwuiMq9+KNeywHmLoOnJjjy8c78jXN0emeVMNt7NrC88b8eizD6KUiiTXnaKoYZnDT7Syf/MtkVCPWbOoc+/fg30ns7maXT77vcO8YSRvcPpFsXjNKVKGpa3IE9XDZ/CVMHiE6SZfhimEwG970WlX6L0Xa+XvSWQlWEyH02mLQu6d4DRwTNu1CUl8k+B1miL/mgWqXOTN0/6Pn4CHSyPDhk2qk2lEZbWNXQnkVm55KmvvWUgwn0m3VuK9mFI99WWG/2d83dyMGnjZ5DIqBJcT940ICixXJA/rU+UT4iZHEySQyDMiNgKAozbmjWzwrXzdBHFuHwq9PrW3cN2Vsp4mWhkzJlw0pmJvhU6YMr/HKvj2Al0si9jRJlFerBtbNC1hovkCSGkGXqmYf7hdgZ8BomDrOiJGbuqHTdLUSfmiNvAR7tekNu8FVCIiYB/WgUNFCdQIC',


  init: () => {
    OneDriveHandler.getAccessToken();
  },

  getAccessToken: () => {
    var createCORSRequest = function(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // Most browsers.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // IE8 & IE9
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
      return xhr;
    };

    var url = 'https://api.onedrive.com/v1.0/drive/root/view.search?filter=image';
    var method = 'GET';
    var xhr = createCORSRequest(method, url);

    xhr.onload = function(resp) {
      // Success code goes here.
      console.log("onload: " + resp);
    };

    xhr.onloadend = function(resp) {
      // Success code goes here.
      console.log("onloadend");
      console.log(resp);
    };

    xhr.onerror = function(err) {
      // Error code goes here.
      console.log("Error: " + err);
    };

    xhr.setRequestHeader('Authorization', `Bearer ${OneDriveHandler.token}`);
    xhr.send();
  },

  launchOneDrivePicker: () => {

    let odOptions = {
      clientId: "c3e33c0d-c915-4e56-bbb5-52c74f7d040e",
      advanced: {
        redirectUri: "https://login.live.com/oauth20_authorize.srf"
      },
      success: files => {
        console.log(files);
      },
      cancel: () => {
        // Empty.
      },
      error: e => {
        console.log(e);
      }
    };
    OneDrive.open(odOptions);
  }

};

window.onload = OneDriveHandler.init();
