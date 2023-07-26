# Documentation

## Implementation vs Technical Design

Due to some prototyping before completing v2 of the technical design, the app mostly follows the technical design. I followed my approaches to the different game modes & variations quite closely, and there is a `gameConfig.ts` which holds the maps of different game types. It is a nice approach that allows little refactoring when adding future features.

Despite thinking I could go without a state management library, I ended up using Recoil due to being lightweight and quick to set up. This ended up being a very good decision because they work very well when paired with hooks to compartmentalize different domains of code.

I ended up making three main hooks - `useComputerPlayer`, `useGame` and `useGrid`. With the AI logic, I ended up splitting `useComputerPlay` into `useMisereComputer` and `useStandardComputer`. These two win conditions made enough difference that it was worth seperating the two. However, I found out the logic for differentiating between "Standard" and "Wild" variations did not need the same level abstraction - the only difference is you must give an input on "what markers are the AI allowed to use?", but that is easily integrated into each hook.

I ended up not needing many pure ui components - only really needed a simple `Button` component. I could have made some customised form components for the menu to use, but I think my implementation of a form css module is still a good approach.

## Main limitations

There is still a bit of direct checking of modes and variations. I think that might cause a bit of a headache when you try to enhance this project in the future. My solution for the game implies that CPU can never take the first turn. 

The AI itself is quite simplistic in its nature - I do lose to it now and again, but it struggles in Wild mode. It will on occasion, accidentally set you up for a win. However, it does know how to making a winning move, and in Standard (& misere) mode knows how to make a defensive move.

# Time constraints & Future work

I did not want to work far beyond 15 hours (I could have spent days perfecting it & having 100% test coverage but that kinda defeats the point) so the following is things that I did not have time to work on:

- Making the AI more challenging, especially in Wild mode. Even if it meant going back to the drawing board and trying a different approach (eg. minimax algorithm or neural networks)
- I could have fleshed out more ui or molecule components, especially felt I could have split up the Grid component a bit more
- Possibly have made more robust styling. Didn't use a framework like Tailwind mainly because I enjoy pure CSS and it's nice to have full control of your styling
- Could have broken up the Menu page component, everything is kind of thrown in there
- I wanted to make a selector atom that grabs all the different game settings in a read-only state. I think that would have been quite useful
- I have unit tests for all the non-trivial utility functions, and each hook is ultimately tested via the BaseGame integration tests. However if I had more time I would have added many more integration test suites, and made some functional tests via Cypress

And the following were "nice to have" ideas that popped up while I was working on it:

- An option to change grid size. Due to my solution architecture this would not be very hard to implement
- Choose which player is which, especially in single-player
- I wanted to add a random delay before the CPU turn, to create the illusion of the AI "thinking"
- A CPU vs CPU mode would have been very interesting
- A score tally for player 1 & 2 would have been nice
- A bit more on the a11y side (I don't like how you have to tab through each grid cell, and I haven't fully tested screen-reader compatibility)
- I have some hardcoded strings in here, would have probably made some sort of localisation system if I had the time. Maybe with `react-intl`
