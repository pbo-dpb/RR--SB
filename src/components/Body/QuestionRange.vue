<template>
  <div class="w-full">
    <input
      type="range"
      list="tickmarks"
      value="50"
      min="0"
      max="100"
      step="10"
      class="w-full"
    />
    <datalist id="tickmarks">
      <option value="0"></option>
      <option value="10"></option>
      <option value="20"></option>
      <option value="30"></option>
      <option value="40"></option>
      <option value="50"></option>
      <option value="60"></option>
      <option value="70"></option>
      <option value="80"></option>
      <option value="90"></option>
      <option value="100"></option>
    </datalist>
  </div>
</template>

<script>
export default {};
</script>
