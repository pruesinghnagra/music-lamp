# Music Lamp

- dataset explorer + algorithm sandbox
- small set of artist from Aotearoa
- fields to use: genre, language, region, ethnicity (if available), number of followers/listeners
- UI - sort, filter, run a basic algorithm (ranking system or cluster genres)

JSON dataset, what is k-means?
Super basic react app

why? hands on algorithm logic exp and how does data influence visibility
is value computed or inferred?

example of computed value:
value assigned though quantitative mathmatical processes

- a song ranked higher because it has 100k plays
- an artist is recommended more often because they are on 10+ playlists
- albums get RIAA Certification because of a spike in engagement with 24 hours (viral)

Computed value is explicit and visible in platform logic

example of inferred value:
more abstract — platforms (or their users) assume something is valuable because of context or patterns

- an artist with lots of followers is assumed to be good, even if followers were bought or passive
- a track is added to a popular playlist, the platform assumes it’s relevant or trending
- an artist is played by a listener who also likes Beyoncé, the platform infers that others who like Beyoncé might like this artist too

Inference is relational — value is deduced from associations, correlations, or user behavior patterns

What counts as valuable and how does that shape culture by:

- compressing cultural richness into data points
- metrics (plays, likes) over others (community impact, political meaning)
- human judgment obscured behind maths? What is undiscovered?

What to find:

- what kinds of value can’t be captured by algorithms?
- are the metrics that determine visibility fair?
- how might indie artists from diverse backgrounds be misrepresented or flattened by algorithmic inference?

TO Do:
Add a simple bar chart of monthly listeners or followers for each artist
Use an easy library, Recharts or Chart.js.
Just hardcode a tiny dataset or use your filtered list and log it to the console

Algorithmic exploration:

Write a simple function to calculate “value” with weights for Spotify and YouTube.

Experiment by changing weights and seeing how the sorted list changes.

Maybe try grouping artists by genre or region and find top “value” per group.

Integrate real APIs:

Register for Spotify API access.

Write a tiny fetch to get artist data

Replace or augment mock data with real API data.

Cache API results locally to avoid hitting rate limits.
