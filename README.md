# pxt-webapps

THIS IS A SAMPLE REPO -- PROTOTYPE ONLY

Web applications for various Microsoft MakeCode targets.

## First-time dev setup

1. This doc assumes you have a functioning pxt development environment. Refer here for setup instructions: https://github.com/microsoft/pxt-arcade#manual-setup
2. Similar to the above, this repo expects to exist as a peer to the [`pxt`](https://github.com/microsoft/pxt) repo. Your local filesystem should look something like this:
    ```
        /dev
        |--/pxt
        |--/pxt-common-packages
        |--/pxt-webapps       (<-- this repo)
        |--/pxt-arcade
    ```
3. At the root of this repo, run:
   ```
    npm install
    npm run link
   ```

   `npm install` -- installs dependencies for all projects in this monorepo.
   
   `npm run link` -- symlinks the pxt repo to this one as a local package dependency.


## Projects in this Monorepo

* [AuthCode](./apps/authcode/README.md)
* [Skillmap](./apps/skillmap/README.md)
* [Multiplayer](./apps/multiplayer/README.md)
* [Kiosk](./apps/kiosk/README.md)


# Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.


# Trademarks

MICROSOFT, the Microsoft Logo, MAKECODE, and MAKECODE ARCADE are registered trademarks of Microsoft Corporation. They can only be used for the purposes described in and in accordance with Microsoft’s Trademark and Brand guidelines published at https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general.aspx. If the use is not covered in Microsoft’s published guidelines or you are not sure, please consult your legal counsel or MakeCode team (makecode@microsoft.com).
