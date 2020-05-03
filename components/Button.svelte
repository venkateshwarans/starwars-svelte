<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const handleClick = () => {
	  dispatch('message', {
	    text: 'Hello!'
	  });
  }
  export let disabled = false;
</script>

<button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" {disabled} on:click={handleClick}>
  <slot></slot>
</button>

<style>
  button {
    display: inline;
  }
</style>
