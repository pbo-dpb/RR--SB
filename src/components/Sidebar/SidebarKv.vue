<template>
    <li class="grid grid-cols-3 gap-2 text-xs">
        <div class="col-span-2"><slot name="key"></slot></div>
        <div class="text-right"><slot name="value"></slot></div>
    </li>
</template>
