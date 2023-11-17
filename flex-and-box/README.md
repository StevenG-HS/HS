# Managing layouts: Flex and Box sample

This sample is designed to help you with layout management in our custom cards by showing ways of using `<Flex>` and `<Box>`. There are two cards provided by this sample, both of which will be on the Deal object.

### 1. **Flex playground card**:(FlexPlayground.jsx [ADD LINK])

- This is a card which will let you experiment with various Flex props to better understand how they work together.
- You can Add/Remove tiles, change the various properties of Flex and implement this spacing in your own cards

### 2. **Flex and Box example card**:(FlexAndBoxExample.jsx [ADD LINK])

- This is a dummy real estate listing card for deal records that uses Flex and Box to arrange information on each listing.
- This card aims to show how the front end layout works with many components. It allows users to add a property listing based on the form below. On refresh, the original listings will be restored. Note that it doesn't save the user input.

[INSERT screenshots here]

We recommend installing this sample in a Sandbox account.

## Quick Start

### Step 1: Update your CLI and & authenticate your account

1. Update to latest CLI version by running `npm install -g @hubspot/cli@latest`.
1. Run `hs init` if you haven’t already done so to create a config file for your parent account.
1. Run `hs auth` to authenticate your account. Alternatively, select your pre-authenticated account with `hs accounts use`.

### Step 2: Create Flex and Box project

Create a new project with `hs project create --templateSource="HubSpot/ui-extensions-examples"`

### Step 3: Install dependencies

In the CLI, run `npm install` to install the dependencies for this project.

### Step 4: Upload project

Run `hs project upload`. Alternatively, if you’d like to build on this project, run `hs project dev` to kickoff the dev process and see changes reflected locally as you build.

### Step 5: View the cards

In the main menu select `Sales` > `Deals` to view deal records. Click on any of the deal objects and navigate to the custom tab to access the two sample cards. If you don’t have any deals in the account you’re using to view this sample, create a deal by the following steps:

1. In the main menu, select `Sales` > `Deals`.
2. Click `Create deal` in the top right hand corner and fill in all required fields. Click `create` once you’ve finished filling in your deal details.
3. Your new deal should appear in the `Deals table`. Select it and navigate to the `custom tab` in the middle pane to access the sample cards.