<script>
	import { data, fetchState, getStars  } from '../store/swapi.js';
 	import { fade, draw, fly } from 'svelte/transition';
	import Button from '../components/Button.svelte';
	import Tailwindcss  from '../components/Tailwindcss.svelte';
	import Card from '../components/Card.svelte'
	import Spinner from '../components/Spinner.svelte';
	import { onDestroy } from 'svelte';
	export let name;
	let idx = 1

	const handleClick = (direction) => {
		if(direction === 'prev' && $fetchState !== 'Loading') {
			getStars(--idx) ;
		} else if(direction === 'next' && $fetchState !== 'Loading') {
			getStars(++idx);
		} else {
			console.log('Not found')
		}
	}
	$: $data && console.log($data.next)
</script>

<Tailwindcss />

<main>

	<h1>Star Wars {name}!</h1>
	<div class="controls">
		<Button disabled={$data && $data.previous === null} on:message={() => handleClick('prev')}>Previous</Button>
		<Button disabled={$data && $data.next === null} on:message={() => handleClick('next')}>Next</Button>
		{#if $fetchState === 'Loading'}
				<Spinner visible={true}></Spinner>
		{/if}
	</div>
	{#if !$data}
			<Spinner visible={true}></Spinner>
	{:else}
	<br>
		<div class="flex flex-wrap -mb-4">
			{#each $data.results as item, i (i)}
				<Card>
					<span slot="name">{item.name}</span>
					<span slot="content">{item.model}</span>
				</Card>
			{/each}
	</div>

<br>
		<pre class:stale={$fetchState !== 'Done'}>
			{JSON.stringify($data, null, 4)}
		</pre>
	{/if}
</main>

<style>

	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	pre {
		background: #ccc;
	}

	h1 {
    @apply bg-black text-white;
  }

	pre.stale {
		opacity: 0.6;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
