<template>
    <div
        class="-mx-2 flex grid-cols-8 flex-col items-center gap-4 rounded-xs bg-gray-50 p-2 lg:grid dark:bg-gray-800">
        <div class="w-full lg:col-span-4">
            <label
                class="font-semibold"
                :for="uid"
                >{{ question.name }}</label
            >

            <ul class="flex flex-col font-light">
                <li>
                    {{ $root.strings.selected_value }}
                    <span
                        v-if="question.isAltered"
                        class="mr-1 text-gray-800 line-through dark:text-gray-200 print:text-black">
                        {{
                            $root.strings.formatNumber(
                                question.default_value,
                                question.unit_style,
                            )
                        }}</span
                    ><span
                        :class="{
                            'text-orange-600': question.isAltered,
                        }"
                        >{{
                            $root.strings.formatNumber(
                                question.user_value,
                                question.unit_style,
                            )
                        }}</span
                    >
                </li>
            </ul>

            <p
                v-if="question.description"
                class="prose dark:prose-invert prose-sm mt-2 max-w-none leading-tight text-gray-800 italic dark:text-gray-200">
                {{ question.description }}
            </p>
        </div>

        <div class="w-full lg:col-span-3 print:hidden">
            <question-range
                :uid="uid"
                :question="question"></question-range>
        </div>

        <div
            class="text-center"
            :class="{
                hidden: !question.isAltered,
                'lg:block': !question.isAltered,
            }">
            <span
                class="bordered py-.5 rounded-xs px-1 text-sm font-semibold text-white print:text-black"
                :class="{
                    'bg-red-800': question.userValueImpact < 0,
                    'bg-green-800': question.userValueImpact > 0,
                    'bg-gray-500': !question.isAltered,
                }"
                ><span v-if="question.isAltered">{{
                    $root.strings.formatNumber(
                        $root.strings.roundCurrency(
                            question.userValueImpact / 1000000.0,
                        ),
                        "currency",
                    )
                }}</span
                ><span v-else>0</span></span
            >
        </div>
    </div>
</template>

<script>
    import Question from "../../Models/Question";
    import QuestionRange from "./QuestionRange.vue";
    export default {
        components: {
            QuestionRange,
        },
        props: {
            question: {
                type: Question,
                required: true,
            },
        },
        data() {
            return {
                ruid: `qura-${Math.floor(Math.random() * 65536)}`,
            };
        },
        computed: {
            uid() {
                return `${this.ruid}-${(
                    "" +
                    this.question.minimum +
                    this.question.maximum +
                    this.question.step
                )
                    .match(/\d/g)
                    .join("")}`;
            },
        },
    };
</script>
