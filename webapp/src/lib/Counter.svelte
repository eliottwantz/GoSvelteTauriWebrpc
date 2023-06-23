<script lang="ts">
  import { api } from "../api";

  let count: number = 0;
  const increment = async () => {
    count += 1;
    const res = await api.status();
    console.log(res.status);
  };
</script>

<button on:click={increment}>
  count is {count}
</button>
