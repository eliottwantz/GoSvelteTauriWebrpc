<script lang="ts">
  let number: number;

  async function fetchNumber() {}
</script>

<form class="row" on:submit|preventDefault={fetchNumber}>
  <button type="submit">Number: {number ?? ""}</button>
</form>
