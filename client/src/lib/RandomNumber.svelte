<script lang="ts">
  import { api, safeFetch } from "src/api";

  let number: number;
  let errorMsg = "";

  async function fetchNumber() {
    const res = await safeFetch(api.randomNumber);
    res
      .map((data) => {
        number = data.number;
        errorMsg = "";
      })
      .mapErr((e) => {
        console.log(e);
        errorMsg = e.cause;
      });
  }
</script>

<form class="row" on:submit|preventDefault={fetchNumber}>
  <button type="submit">Number: {number ?? ""}</button>
  <span class="error">{errorMsg ?? ""}</span>
</form>

<style>
  .error {
    color: red;
  }
</style>
