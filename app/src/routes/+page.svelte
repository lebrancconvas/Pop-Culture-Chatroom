<script lang="ts">
  // your script goes here
  import Chatroom from '$lib/Chatroom.svelte';
  import Typebox from '$lib/Typebox.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
  <title>Talkabot Chat | The Pop Culture Chatroom</title>
</svelte:head>

<div>
  <header>
    <h1>Talkabot Chat</h1>
    <h2>The Pop Culture Chatroom</h2>
  </header>
  <Chatroom />
  <Typebox />
  <Footer />
</div>

<style>
  /* your styles go here */
  * {
    font-family: 'Nunito Sans', sans-serif;
  }

  header {
    text-align: center;
  }
</style>

<!-- markup (zero or more items) goes here -->
