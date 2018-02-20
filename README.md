Newer versions of jest don't allow for the unhandledRejection handler being used in tests, because jest's handler cannot be overridden or unregistered.

This repo contains an example of some code that throws an Error in an async function that runs forever (seems contrived but in our production code this is a service that polls a message queue) and an accompanying test making sure that the code rejects in a way that the uncaught rejection handler is called, making sure that in production the service would shutdown.

There are two tagged commits with two different jest versions installed.

The commit tagged `broken` contains a newer version of jest where the test fails because jest handles the rejection and makes the test fail:

```sh
$ git checkout works && yarn && yarn test && git checkout master

Note: checking out 'works'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at d118e1a works
yarn install v1.3.2
[1/4] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.36s.
yarn run v1.3.2
$ jest
 PASS  src/index.test.js
  foo
    ✓ bar (3012ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.219s, estimated 4s
Ran all test suites.
✨  Done in 3.76s.
Previous HEAD position was d118e1a works
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
```

The commit tagged `works` contains an older version of jest where this was testable:

```sh
$ git checkout broken && yarn && yarn test; git checkout master
Note: checking out 'broken'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at 850b04a broken
yarn install v1.3.2
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
✨  Done in 4.53s.
yarn run v1.3.2
$ jest
 FAIL  src/index.test.js
  foo
    ✕ bar (3014ms)

  ● foo › bar

    Error thrown

       7 |     while (true) {
       8 |       if (i === 3) {
    >  9 |         throw new Error();
      10 |       } else {
      11 |         i++;
      12 |         await delay(1000);

      at run (src/index.js:9:15)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        3.886s, estimated 4s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
Previous HEAD position was 850b04a broken
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 3 commits.
  (use "git push" to publish your local commits)
```
