# Mosaic Mood Terminal

Can you actually build a beautiful, terminal aesthetic and function-based, animative and app-based website for a product that i want to build:

A Terminal that isn't just a plain shell and provide the necessary capabilities to make it look good, it is something reactive, servable(you can run it as a server in a machine and SSH to the machine and Terminal will work flawlessly or can just, without running a server, Shh to a machine through the app and it uses the SSH machine as the environment while balancing the fact that it's on another computer), integratable(I'll cover this in a full explanation), clean and design-able.

It is not just a Terminal, that's something I want to say first and my next explanation should prove this:
It is reactive - it doesn't just look colourful and aesthetic; the colours, animations and aesthetics can represent the state of the environment: low battery? A specific design. too much load? Change to a new design. A command just finished? Change to another state and more.

It is servable - let's say you mostly SSH into a machine and since your Terminal is the interface you'll use, the Terminal shouldn't be designed for just running commands then. You can run a server on the machine to be ssh-ed into and that machine serves as a medium for the Terminal to connect to that machine and look as if you're on that machine. And if you do want just normal SSH, it has its SSH mode that treats the Shh machine as the execution environment and balances the client machine

It is Integratable - this houses more features than you think:
You can make Terminal UIs and commands like apps and the Terminal opens them in a view that makes it an app
You can use the Terminal as a medium to set some of your favourite Terminal apps to serve some purposes
It provides interfaces stuff called modules, widgets, and other UI-like stuff that can be used to interact with the user

It is a multiplexer that can serve as your workspace - and it is customisable in this part:
It can multiplex and the way it does it is more than just drawing a line in a window and opening seperate shells
You have a statusbar, sidebar, windowbar and a multiview(a view where the main area doesn't have a shell only and can consist of other things configured).
You can customise those and have your own design
It (can) behaves like it's a different desktop view - desktop mode

It is UI rich and clean - it provides more UI feel and some special features that TUIs and command-based apps can use to make their interface feel more polished and beautiful.
It supports image display, it supports other rich Terminal interface primitives

It is design-able - while it comes with its basic extraordinary defaults, you can design how it should look like

That is just what I can say right now to show

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4d6002a2-69b0-447d-a060-a3d60bf32ccc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
