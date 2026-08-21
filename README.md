# Pokedex

A **CI/CD** pipeline built around a small Pokedex application, covering GitHub Actions workflows for linting, testing, building, and end-to-end testing with Playwright. Created as part of Full Stack Open, part 11.

**Course:** https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-continuous-integration

**pet-project:** https://github.com/mykola-lp/prep-tracker

## Local Development

Start by running `npm install` inside the project folder.

## Exercises

### Exercise 1. Warm up

Before getting our hands dirty with setting up the CI/CD pipeline, let us reflect a bit on what we have read.

Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.

Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.

Write a short text, say 200-300 words, where you answer or discuss some of the points below.

The points to discuss:

- Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by Google.
- What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask Google!
- Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

Remember that there are no 'right' answers to the above!

### Exercise 2. The example project

In most exercises of this part, we are building a CI/CD pipeline for a small project found in [this example project repository](https://github.com/fullstack-hy2020/fs-pokedex).

Create a GitHub repository for the exercise submission. Copy the contents of the example application repository into your new repository. If you are using a private repository, add the GitHub user `mluukkai` as a collaborator.

As always, when starting with a new code, the most obvious place to look first is the file `package.json`.

Try now the following:

- install dependencies
- start the code in development mode
- run tests
- lint the code

You might notice that the project contains some broken tests and linting errors. Just leave them as they are for now. We will get around those later in the exercises.

> **NOTE:** the tests of the project have been made with [Jest](https://jestjs.io/). The course material in [part 5](https://fullstackopen.com/en/part5/testing_react_apps) uses [Vitest](https://vitest.dev/guide/). From the usage point of view, the libraries have barely any difference.

As you might remember from [part 3](https://fullstackopen.com/en/part3/deploying_app_to_internet#frontend-production-build), the React code should not be run in development mode once it is deployed in production. Try now the following:

- create a production build of the project
- run the production version locally

Also for these two tasks, there are ready-made npm scripts in the project!

Study the structure of the project for a while. As you notice both the frontend and the backend code are now [in the same repository](https://fullstackopen.com/en/part7/class_components_miscellaneous#frontend-and-backend-in-the-same-repository). In earlier parts of the course we had a separate repository for both, but having those in the same repository makes things much simpler when setting up a CI environment.

In contrast to most projects in this course, the frontend code does not use Vite but it has a relatively simple [Webpack](https://fullstackopen.com/en/part7/webpack) configuration that takes care of creating the development environment and creating the production bundle.

### Exercise 3. Hello world!

Create a new Workflow that outputs "Hello World!" to the console. For the setup, you should create the directory `.github/workflows` and a file `hello.yml` in your repository.

To see what your GitHub Action workflow has done, you can navigate to the Actions tab in GitHub, where you should see the workflows in your repository and the steps they implement.

You should see the "Hello World!" message as an output. If that's the case then you have successfully gone through all the necessary steps. You have your first GitHub Actions workflow active!

Note that GitHub Actions also informs you of the exact environment (operating system and its setup) where your workflow is run. This is important since if something surprising happens, it makes debugging so much easier if you can reproduce all the steps on your machine!

### Exercise 4. Date and directory contents

Extend the workflow with steps that print the date and current directory content in the long format.

Both of these are easy steps, and just running commands [date](https://man7.org/linux/man-pages/man1/date.1.html) and [ls](https://man7.org/linux/man-pages/man1/ls.1.html) will do the trick.

As the output of the command `ls -l` shows, by default, the virtual environment that runs our workflow does not have any code!

### Exercise 5. Linting workflow

Implement or copy-paste the "Lint" workflow and commit it to the repository. Use a new yml file for this workflow, you may call it e.g. `pipeline.yml`.

Push your code and navigate to the Actions tab, and click on your newly created workflow on the left. You should see that the workflow run has failed.

### Exercise 6. Fix the code

There are some issues with the code that you will need to fix. Open up the workflow logs and investigate what is wrong.

A couple of hints. One of the errors is best fixed by specifying the proper environment for linting. See e.g. [here](https://fullstackopen.com/en/part3/validation_and_es_lint#lint) how it can be done. One of the complaints concerning the `console.log` statement could be taken care of by simply silencing the rule for that specific line. Ask Google how to do it.

Make the necessary changes to the source code so that the lint workflow passes. Once you commit new code, the workflow will run again, and you will see updated output where all is green again.

### Exercise 7. Building and testing

Let's expand on the previous workflow that currently does the linting of the code. Edit the workflow and, similarly to the lint command, add commands for build and test.

As you might have guessed, there are some problems in the code...

### Exercise 8. Back to green

Investigate which test fails and fix the issue in the code (do not change the tests).

Once you have fixed all the issues and the Pokedex is bug-free, the workflow run will succeed and show green!

### Exercise 9. Simple end-to-end tests

The current set of tests uses [Jest](https://jestjs.io/) to ensure that the React components work as intended. This is essentially the same thing that is done in the section [Testing React apps](https://fullstackopen.com/en/part5/testing_react_apps) of part 5 with [Vitest](https://vitest.dev/).

Testing components in isolation is quite useful, but that still does not ensure that the system as a whole works as we wish. To have more confidence about this, let us write a couple of really simple end-to-end tests, similarly to what we did in [part 5](https://fullstackopen.com/en/part5/). We shall use [Playwright](https://playwright.dev/) for the tests.

Before going on, you should extend the Jest definition in `package.json` to prevent Jest from trying to run the e2e-tests. Assuming that directory `e2e-tests` is used for e2e-tests, the definition is:

```json
{
  // ...
  "jest": {
    "testEnvironment": "jsdom",
    "setupFiles": ["<rootDir>/jest.setup.js"],
    "testPathIgnorePatterns": ["e2e-tests"]
  }
}
```

Set up Playwright in your repository. You'll find all the info you need [here](https://fullstackopen.com/en/part5/end_to_end_testing_playwright). Note that in contrast to part 5, you should now install Playwright to the same project as the rest of the code!

Use this test first:

```js
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })
})
```

Note that although the page renders the Pokemon names with an initial capital letter, the names are actually written with lowercase letters in the source, so you should test for `ivysaur` instead of `Ivysaur`!

Define an npm script `test:e2e` for running the e2e tests from the command line.

Remember that the Playwright tests assume that the application is up and running when you run the test! Instead of starting the app manually, you should now configure a Playwright development server to start the app while tests are executed, see [here](https://playwright.dev/docs/next/api/class-testconfig#test-config-web-server) how that can be done.

Ensure that the test passes locally.

Once the end-to-end test works on your machine, include it in the GitHub Action workflow. That should be pretty easy by following [this guide](https://playwright.dev/docs/ci-intro#on-pushpull_request).

**Once the pipeline works...**

Once you are sure that the pipeline works, write another test that ensures that one can navigate from the main page to the page of a particular Pokemon, e.g. ivysaur. The test does not need to be a complex one, just check that when you navigate to a link, the page has some proper content, such as the string `chlorophyll` in the case of ivysaur.

Note the Pokemon abilities are written with lowercase letters in the source code (the capitalization is done in CSS), so do not test for `Chlorophyll` but rather `chlorophyll`.

End-to-end tests are nice since they give us confidence that the software works from the end user's perspective. The price we have to pay is the slower feedback time. Now executing the whole workflow takes quite much longer.

### Exercise 10. Deploying your application to cloud provider

Deploy your app to Fly.io or Render by following the hints above!

You should add a link to your deployed app to the `README.md` of your repository.

### Exercise 11. Automatic cloud deployments

Make deployments automatic.

### Exercise 12. Health check

Ensure the health of your deployed app!

### Exercise 13. Pull request

Update the trigger of the existing workflow, as suggested above, to run on new pull requests to your main branch. Remember to do this first in the main branch before going on!

Create a new branch, commit your changes, and open a pull request to your main branch.

If you have not worked with branches before, check [this tutorial](https://www.atlassian.com/git/tutorials/using-branches) to get started.

In the "Conversation" tab of the pull request, you should see your latest commit(s) and the yellow status for checks in progress.

Once the checks have been run, the status should turn to green. Make sure all the checks pass.

Do not merge your branch yet, there's still one more thing we need to improve on our pipeline.

### Exercise 14. Run deployment step only for the main branch

All looks good, but there is actually a pretty serious problem with the current workflow. All the steps, including the deployment, are run also for pull requests. This is surely something we do not want!

Fortunately, there is an easy solution for the problem! We can add an [if](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsif) condition to the deployment step, which ensures that the step is executed only when the code is being merged or pushed to the main branch.

The workflow [context](https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions#contexts) gives various kinds of information about the code the workflow is run.

The relevant information is found in [GitHub context](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context), the field `event_name` tells us what is the "name" of the event that triggered the workflow. When a pull request is merged, the name of the event is somehow paradoxically `push`, the same event that happens when pushing the code to the repository. Thus, we get the desired behavior by adding the following condition to the step that deploys the code:

```yml
if: ${{ github.event_name == 'push' }}
```

Push some more code to your branch, and ensure that the deployment step is not executed anymore. Then merge the branch to the main branch and make sure that the deployment happens.

### Exercise 15. Adding versioning

Let's extend our workflow so that it will automatically increase (bump) the version when a pull request is merged into the main branch and [tag](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag) the release with the version number. We will use an open source action developed by a third party: [anothrNick/github-tag-action](https://github.com/anothrNick/github-tag-action).

We will extend our workflow with one more step:

```yml
- name: Bump version and push tag
  uses: anothrNick/github-tag-action@1.75.0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Note: you should use the most recent version of the action, see [here](https://github.com/anothrNick/github-tag-action) if a more recent version is available.

We're passing an environmental variable `secrets.GITHUB_TOKEN` to the action. As it is a third-party action, it needs the token for authentication in your repository. You can read more [here](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) about authentication in GitHub Actions.

You may end up having this error message

The most likely cause for this is that your token has no write access to your repo. Go to your repository settings, select actions/general, and ensure that your token has read and write permissions.

The [anothrNick/github-tag-action](https://github.com/anothrNick/github-tag-action) action accepts some environment variables that modify the way the action tags your releases. You can look at these in the [README](https://github.com/anothrNick/github-tag-action) and see what suits your needs.

As you can see from the documentation by default your releases will receive a minor bump, meaning that the middle number will be incremented.

Modify the configuration above so that each new version is by default a patch bump in the version number, so that by default, the last number is increased.

Remember that we want only to bump the version when the change happens to the main branch! So add a similar `if` condition to prevent version bumps on pull requests, as was done in [Exercise 14](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-continuous-integration/chapter-5#c323fb6a-1b26-4d62-95ee-64408a1f76b7) to prevent deployment on pull request related events.

Complete the workflow now. Do not just add it as another step, but configure it as a separate job that depends on the job that takes care of linting, testing, and deployment. So change your workflow definition as follows:

```yml
name: Deployment pipeline
on:
  push:
    branches:
      - main
  pull_request:
    branches: [main]
    types: [opened, synchronize]
jobs:
  simple_deployment_pipeline:
    runs-on: ubuntu-latest
    steps:
      # steps here
  tag_release:
    needs: [simple_deployment_pipeline]
    runs-on: ubuntu-latest
    steps:
      # steps here
```

As mentioned [earlier](https://fullstackopen.com/en/part11/getting_started_with_git_hub_actions#getting-started-with-workflows), the jobs of a workflow are executed in parallel. To ensure that linting, testing, and deployment all complete successfully before a release is tagged, we use the [needs](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idneeds) key to make `tag_release` depend on those earlier jobs. This prevents the release from being tagged unless the pipeline has fully passed.

If you're uncertain of the configuration, you can set `DRY_RUN` to `true`, which will make the action output the next version number without creating or tagging the release!

Once the workflow runs successfully, the repository mentions that there are some tags.

### Exercise 16. Skipping a commit for tagging and deployment

In general, the more often you deploy the main branch to production, the better. However, there might sometimes be a valid reason to skip/prevent a particular commit or a merged pull request from being tagged and released to production.

Modify your setup so that if a commit message in a pull request contains `#skip`, the merge will not be deployed to production, and it is not tagged with a version number.

Hints:

The easiest way to implement this is to alter the [if](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsif) conditions of the relevant steps. Similarly to [exercise 14](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-continuous-integration/chapter-5#c323fb6a-1b26-4d62-95ee-64408a1f76b7) you can get the relevant information from the [GitHub context](https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions#github-context) of the workflow.

You might take this as a starting point:

```yml
name: Testing stuff
on:
  push:
    branches:
      - main
jobs:
  a_test_job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: github context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
      - name: commits
        env:
          COMMITS: ${{ toJson(github.event.commits) }}
        run: echo "$COMMITS"
      - name: commit messages
        env:
          COMMIT_MESSAGES: ${{ toJson(github.event.commits.*.message) }}
        run: echo "$COMMIT_MESSAGES"
```

See what gets printed in the workflow log!

Note that you can access the commits and commit messages only when pushing or merging to the main branch, so for pull requests the `github.event.commits` is empty. It is anyway not needed, since we want to skip the step altogether for pull requests.

You most likely need functions [contains](https://docs.github.com/en/actions/learn-github-actions/expressions#contains) and [join](https://docs.github.com/en/actions/learn-github-actions/expressions#join) for your `if` condition.

Developing workflows is not easy, and quite often the only option is trial and error. It might actually be advisable to have a separate repository for getting the configuration right, and when it is done, to copy the right configurations to the actual repository.

It would also be possible to install a tool such as [act](https://github.com/nektos/act) that makes it possible to run your workflows locally. Unless you end up using more involved use cases like creating your [own custom actions](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions), going through the burden of setting up a tool such as act is most likely not worth the trouble.

### Exercise 17. Adding protection to your main branch

Add protection to your main branch. You should protect it to require all status checks to pass before merging.

### Exercise 18. Build status notification action

We have set up a channel `fullstack_webhook` to the course Discord group at [study.cs.helsinki.fi/discord/join/fullstack](https://study.cs.helsinki.fi/discord/join/fullstack) for testing a messaging integration.

Register now to Discord if you have not already done that. You will also need a Discord webhook in this exercise. You find the webhook in the pinned message of the channel `fullstack_webhook`. Please do not commit the webhook to GitHub!

You can find quite a few third-party actions from [GitHub Action Marketplace](https://github.com/marketplace?type=actions) by using the search phrase [discord](https://github.com/marketplace?type=actions&query=discord). Pick one for this exercise. My choice was [actions-status-discord](https://github.com/marketplace/actions/actions-status-discord) since it has quite a few stars and decent documentation.

Note that since the course Discord webhook has a special format, some of the actions does not work for it. Pick another action if you get an error such as this `The provided webhook URL is not valid`.

Setup the action so that it gives two types of notifications:

- A success indication if a new version gets deployed
- An error indication if a build fails

In the case of an error, the notification should be a bit more verbose to help developers find quickly which is the commit that caused it.

See [here](https://docs.github.com/en/actions/learn-github-actions/expressions#status-check-functions) how to check the job status!

### Exercise 19. A more manageable workflow

When project grows, also the workflow becomes more complex. We already suggested in [Exercise 15](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-continuous-integration/chapter-5#d252bca5-a738-42e2-872e-9df20fdabcaa) that the tagging should be done in a separate job. Make your workflow more manageable by splitting it to logical jobs.

Since jobs can run in parallel (like `notify_success` and `tag_release` in the above), you can speed up your pipeline by splitting it into multiple jobs. For example, if you have a large number of end-to-end tests, it's often a good idea to run them in parallel.

### Exercise 20. Periodic health check

We are pretty confident now that our pipeline prevents bad code from being deployed. However, there are many sources of errors. If our application were to depend on a database that would, for some reason, become unavailable, our application would most likely crash. That's why it would be a good idea to set up a periodic health check that would regularly do an HTTP GET request to our server. We quite often refer to this kind of request as a ping.

It is possible to [schedule](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) GitHub actions to happen regularly.

Use the action [url-health-check](https://github.com/marketplace/actions/url-health-check) or any other alternative and schedule a periodic health check ping to your deployed software. Try to simulate a situation where your application breaks down and ensure that the check detects the problem. Write this periodic workflow to its own file.

Note that it might take quite a long time until GitHub Actions starts the scheduled workflow for the first time. But fortunately, you can also trigger the workflow manually from the GitHub actions tab if you add the trigger [workflow_dispatch](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch):

```yml
name: Periodic Hello
on:
  workflow_dispatch:
  schedule:
    - cron: '*/15 * * * *'
jobs:
  health_check:
    runs-on: ubuntu-latest
    steps:
      - run: echo "hello!"
```

Note also that once you get this working, it is best to drop the ping frequency (to max once in 24 hours) or disable the rule altogether, since otherwise your health check may consume all your monthly free hours.

### Exercise 21. Your own pipeline

Build a similar CI/CD pipeline for some of your own applications. Some of the good candidates are the phonebook app that was built in parts 2 and 3 of the course, or the blogapp built in parts 4 and 5, or the Redux anecdotes built in part 6. You may also use some app of your own for this exercise.

You most likely need to do some restructuring to get all the pieces together. A logical first step is to store both the frontend and backend code in the same repository. This is not a requirement but it is recommended since it makes things much more simple.

One possible repository structure would be to have the backend at the root of the repository and the frontend as a subdirectory. You can also "copy paste" the structure of the example app of this part or try out the [example app](https://github.com/fullstack-hy2020/create-app) mentioned in [part 7](https://fullstackopen.com/en/part7/class_components_miscellaneous#frontend-and-backend-in-the-same-repository).

It is perhaps best to create a new repository for this exercise and simply copy and paste the old code there. In real life, you most likely would do this all in the old repository but now "a fresh start" makes things easier.

This is a long and perhaps quite a tough exercise, but this kind of situation where you have a "legacy code" and you need to build proper deployment pipeline is quite common in real life!

Obviously, this exercise is not done in the same repository as the previous exercises. Since you can return only one repository to the submission system, put a link of the other repository to the one you fill into the submission form.

### Exercise 22. Protect your main branch and ask for pull request

Protect the main branch of the repository where you did the previous exercise. This time prevent also the administrators from merging the code without a review.

Do a pull request and ask GitHub user [mluukkai](https://github.com/mluukkai) to review your code. Once the review is done, merge your code to the main branch. Note that the reviewer needs to be a collaborator in the repository. Ping us in Discord to get the review, and to include the collaboration invite link to the message.

Please note what was written above, include the link to the collaboration invite in the ping, not the link to the pull request.

Then you are done!

### Exercise 23. Your GitHub repository

In this exercise, you should only tell us what your exercise repository is.

Note that if you are using a private repository, add the GitHub user `mluukkai` as a collaborator. If the repository can not be accessed, your course is not graded.

Note2: In the `README.md` of your exercise repository, add links to

- your deployed version of your pokedex
- the app repository from the previous two exercises. Make sure this repository is either public or that you have added `mluukkai` as a collaborator