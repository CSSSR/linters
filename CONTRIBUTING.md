## Generating documentation

Documentation is automatically generated via GitHub action ["fundoc"](.github/workflows/fundoc.yml) and published to GitHub Pages. You don't need to commit it when working on the repo.

To generate documentation locally for test purposes you'll need to [install `fundoc`](https://github.com/CSSSR/fundoc#installation) first. Then you can run `fundoc` or `yarn build` in the project root.

To automatically generate documentation on files change consider configuring file watcher in your IDE. Example configuration for WebStorm:

![](https://s.csssr.ru/U07B23NE8/2021-04-20-12-39-40-9zc8j.jpg)
