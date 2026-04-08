---
layout: post
title: Set up Oh My Zsh in the terminal
date: 2026-4-8
tags: [zsh]
comments: false
toc: false  
pinned: false
---

Zsh is the shell; Oh My Zsh is the framework that manages your Zsh configuration. This guide shows a minimal and reliable setup on Ubuntu or Debian, then adds a small optional section for common plugins.

<!-- more -->

## Why use Oh My Zsh instead of plain Bash?

For shell scripting, Bash is still the safer default because it is installed almost everywhere and many CI systems assume it. For interactive terminal work, however, Zsh plus Oh My Zsh is usually more efficient.

The main benefit is not raw execution speed. Commands do not run faster just because you use Oh My Zsh. The real gain is interactive efficiency: fewer keystrokes, fewer command mistakes, and less context switching.

Common advantages for developers:

- Better completion. Zsh generally provides stronger tab completion than plain Bash, and Oh My Zsh gives a ready-to-use configuration on top of it.
- Better prompt context. Most themes show useful information such as the current Git branch, so you do not need to run `git status` as often.
- Plugin-based workflow. Built-in plugins add aliases and helpers for tools such as `git`, `docker`, `kubectl`, `python`, and `vscode`.
- Faster repeated commands. With autosuggestions, previous commands can be accepted with a keystroke instead of retyping them.
- Fewer typing mistakes. Syntax highlighting helps you catch invalid commands, bad paths, or incomplete options before pressing Enter.
- Easier customization. Instead of building a shell setup from scratch, you start from a sensible `~/.zshrc` and extend it gradually.

In practice, this means less time spent remembering long commands, checking repository state, or fixing small terminal mistakes.

## Prerequisites

- Ubuntu or Debian-based Linux
- `sudo` access
- `curl`
- `git`

## 1. Install Zsh

Install Zsh and the tools used by the Oh My Zsh installer:

```bash
sudo apt update
sudo apt install -y zsh curl git
```

Verify the shell is available:

```bash
zsh --version
```

If you already have a custom `~/.zshrc`, back it up before running the installer:

```bash
cp ~/.zshrc ~/.zshrc.bak
```

## 2. Install Oh My Zsh

Run the official installer:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

The installer creates `~/.oh-my-zsh` and a starter `~/.zshrc`. In many cases it also switches you into Zsh immediately.

## 3. Make Zsh the default shell

Set Zsh as your login shell:

```bash
chsh -s "$(command -v zsh)"
```

Start a new terminal session, or switch immediately in the current shell:

```bash
exec zsh
```

## 4. Edit `~/.zshrc`

The two most common changes are the theme and the built-in plugin list:

```bash
ZSH_THEME="robbyrussell"
plugins=(git)
```

`git` is bundled with Oh My Zsh, so no extra installation is needed. Reload the config after each edit:

```bash
source ~/.zshrc
```

## 5. Optional: Common plugins

Oh My Zsh ships with many built-in plugins, but popular plugins such as autosuggestions and syntax highlighting are external and must be installed separately.

### Built-in plugins

These work by editing the `plugins=(...)` line in `~/.zshrc`:

```bash
plugins=(git sudo vscode)
```

- `git` adds many Git aliases
- `sudo` lets you press `Esc` twice to prepend `sudo` to the previous command
- `vscode` adds helpers for opening files and folders in VS Code

### External plugins

Install `zsh-autosuggestions` and `zsh-syntax-highlighting` into the Oh My Zsh custom plugin directory:

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Then enable them in `~/.zshrc`:

```bash
plugins=(git sudo vscode zsh-autosuggestions zsh-syntax-highlighting)
```

Keep `zsh-syntax-highlighting` at the end of the list. Reload the shell:

```bash
source ~/.zshrc
```

## Troubleshooting

### `chsh` fails

Make sure the Zsh path is allowed by the system:

```bash
which zsh
cat /etc/shells
```

If needed, add it once and retry:

```bash
echo "$(command -v zsh)" | sudo tee -a /etc/shells
chsh -s "$(command -v zsh)"
```

### Plugins do not load

Check the following:

1. The plugin name in `plugins=(...)` matches the directory name under `~/.oh-my-zsh/custom/plugins/`.
2. External plugins were cloned successfully.
3. `zsh-syntax-highlighting` is last in the plugin list.
4. You reloaded the shell with `source ~/.zshrc` or opened a new terminal.

## Quick Reference

```bash
sudo apt install -y zsh curl git
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
chsh -s "$(command -v zsh)"
exec zsh
source ~/.zshrc
```


