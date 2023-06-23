<script lang="ts">
  import { api } from "../api";

  let count: number = 0;
  let msgs: boolean[] = [];
  const increment = async () => {
    count += 1;
    const res = await api.status();
    console.log(res.status);
    msgs = [...msgs, res.status];
  };
</script>

<button on:click={increment}>
  Count is {count}
</button>

{#each msgs as msg}
  <p>{msg}</p>
{/each}
