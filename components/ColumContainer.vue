<template>
  <div class="max-w-sm space-y-1">
    <div class="flex item-center pb-4 justify-between gap-2">
      <p class="font-bold text-lg">Recruitment pieaces</p>
      <p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
          />
        </svg>
      </p>
    </div>
    <slot></slot>
  </div>
</template>
