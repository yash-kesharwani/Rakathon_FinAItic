# Cognitive AI Dashboard

## Prerequisites

1.  Install nvm from [here](https://github.com/nvm-sh/nvm)
2.  Install node lts/gallium using nvm
3.  Install yarn from [here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
4.  Install Prettier extension on VsCode
5.  Create a file .huskyrc in home folder
    ```
    nano ~/.huskyrc
    ```
    and put following into it
    ```
    # ~/.huskyrc
    # This loads nvm.sh and sets the correct PATH before running hook`
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    ```

## To run the project

In the project directory, you can run:

First:

```
yarn install
```

then:

```
yarn start
```


## Committing Guidelines :

To generate the changelog for every release, we use the conventional-commit format. In a nutshell, it means that your commits are in the form of: type(scope?): message [flags?] where the type can be one of:

breaking: usually used for MAJOR releases, this indicates that there is some feature which breaks the system's backward compatibility and interoperability;
build: a commit related to build systems (npm, gulp, etc.);
ci: a commit which affects the CI/CD tools and/or pipeline;
chore: a commit which affects anything apart from the source code;
docs: a commit affecting the documentation;
feat: a commit which adds a new feature;
fix: a commit which fixes a bug; message MUST include the issue number;
other: a global umbrella for anything else;
perf: a commit improving the performance;
refractor: a commit which includes refractoring of the source code; MUST NOT add any features/fixes;
revert: revert to a branch/commit/release/tag;
style: a commit fixing the style of the code;
test: add/amend test cases.
scope refers to what part/component/service/file is being changed by this commit.
The message should be a clear, crisp, concise giving a bird's eye view of the commit. In case you want to add additional information, you can leave a blank line after the commit and provide whatever detail you need.
flags MUST be set to breaking in case of a breaking change to the system.
