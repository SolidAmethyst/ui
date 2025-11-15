/**
 * Code examples for Command component documentation
 * Based on solid-ui.com structure
 */

export const commandSnippets = {
  preview: `<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <Command.Empty>No results found.</Command.Empty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Launch</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <span>Profile</span>
        <Command.Shortcut>⌘P</Command.Shortcut>
      </CommandItem>
      <CommandItem>
        <span>Mail</span>
        <Command.Shortcut>⌘B</Command.Shortcut>
      </CommandItem>
      <CommandItem>
        <span>Settings</span>
        <Command.Shortcut>⌘S</Command.Shortcut>
      </CommandItem>
    </CommandGroup>
  </Command.List>
</Command>`,

  installation: `npx solidui-cli@latest add command`,

  imports: `import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"`,

  usage: `<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</Command.Empty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </Command.List>
</Command>`,

  withShortcuts: `<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</Command.Empty>
    <CommandGroup heading="Settings">
      <CommandItem>
        <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
          <UserIcon />
          <span style={{ marginLeft: '8px' }}>Profile</span>
        </div>
        <Command.Shortcut>⌘P</Command.Shortcut>
      </CommandItem>
      <CommandItem>
        <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
          <MailIcon />
          <span style={{ marginLeft: '8px' }}>Mail</span>
        </div>
        <Command.Shortcut>⌘B</Command.Shortcut>
      </CommandItem>
      <CommandItem>
        <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
          <SettingsIcon />
          <span style={{ marginLeft: '8px' }}>Settings</span>
        </div>
        <Command.Shortcut>⌘S</Command.Shortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,

  dialog: `export function CommandMenu() {
  const [open, setOpen] = createSignal(false)

  createEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)

    onCleanup(() => {
      document.removeEventListener("keydown", down)
    })
  })

  return (
    <CommandDialog open={open()} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</Command.Empty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}`,

  customization: `@layer base {
  :root {
    --command-background: 0 0% 100%;
    --command-foreground: 240 5.3% 10.2%;
    --command-border: 220 13% 91%;
    /* Selected item uses primary color */
    --command-selected: var(--primary) / 0.1;
    --command-disabled: 240 5.3% 26.1%;
    --command-group-heading: 240 5.3% 26.1%;
    --command-empty: 240 5.3% 26.1%;
  }

  .dark,
  [data-theme="dark"] {
    --command-background: 240 5.9% 14.1%;
    --command-foreground: 0 0% 96.1%;
    --command-border: 240 3.7% 15.9%;
    /* Selected item uses primary color */
    --command-selected: var(--primary) / 0.1;
    --command-disabled: 240 5.3% 26.1%;
    --command-group-heading: 240 4.8% 95.9%;
    --command-empty: 240 4.8% 95.9%;
  }
}`,
} as const;
