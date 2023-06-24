<script lang="ts">
  import { api } from "src/api";
  import { WebrpcError } from "src/api/api.gen";

  let number: number;
  let error = "";

  async function fetchNumber() {
    try {
      const res = await api.randomNumber();
      number = res.number;
    } catch (e) {
      if (e instanceof WebrpcError) {
        console.log(e.message);
        console.log(e.name);
        console.log(e.cause);
        console.log(e.status);
        console.log(e.code);
        if (e.status === 400) {
          error = e.cause;
        } else if (e.status === 500) {
          error = e.message;
        }
      } else {
        console.log(e);
        error = "Something went wrong";
      }
    }
  }
</script>

<form class="row" on:submit|preventDefault={fetchNumber}>
  <button type="submit">Number: {number ?? ""}</button>
  <span class="error">{error ?? ""}</span>
</form>

<style>
  .error {
    color: red;
  }
</style>
