# AdKit

## Currently

The only thing I have at the moment is a call to create a specified ad size.

The way it works is you can grab this repo, run npm install and then run npm run dev.

It'll ask you a question then you can choose what ad size you want. It will then create the files for you and you can either open /public/index.html or you can open /public/iframe.html.

## How this works

Once you have the repo cloned locally, you'll want to add the following commands:

```bash
npm install
```

Now once everything is installed you will want to run the dev command:

```bash
npm run dev -- --version # shows the version
npm run dev -- --help # shows the help menu
npm run dev -- create # runs the create command
```

## What I'd like to build

I am attempting to create an ad build framework. Here are a list of the things that it will contain in the MVP.

1.  Build out a framework for 300x250, 300x500, 970x250, custom
2.  Build out a packaging system that will take the css and js compress them both and add them to the index. I will also need to make sure that I can add an assets folder.
