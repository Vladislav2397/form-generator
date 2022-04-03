<template lang="pug">
    .b-pagination
        button-component.__button.--prev(
            :disabled="disabledPrev"
            icon="chevron-left"
            aria-label="Предыдущая страница"
            view="flat"
            @click="change(currentPageModel - 1)"
        )
        .__list
            button-component.__item(
                v-for="(page, index) in pages"
                :key="page + index"
                :aria-label="`Страница ${page}`"
                :view="page === currentPageModel ? 'secondary-brand' : 'flat'"
                :disabled="page === '...'"
                @click="change(page)"
            ) {{ page }}
        button-component.__button.--next(
            :disabled="disabledNext"
            icon="chevron-right"
            aria-label="Следющая страница"
            view="flat"
            @click="change(currentPageModel + 1)"
        )
</template>

<script lang="ts">
import {Component, Prop, Vue, ModelSync} from 'vue-property-decorator'
import {PaginationOptions} from "../../js/types/utils/other";

export interface IPaginationProps {
    currentPage: PaginationOptions['currentPage']
    lastPage: PaginationOptions['lastPage']
    step?: number
}

@Component
export default class Pagination extends Vue {
    @ModelSync('currentPage','change') currentPageModel!: IPaginationProps['currentPage']

    @Prop({required: true}) readonly lastPage!: IPaginationProps['lastPage']
    @Prop({default: 2}) readonly step!: IPaginationProps['step']

    change(value:number | string) {
        this.currentPageModel = Number(value)
    }

    get pages() {
        const options = {
            size: parseInt(this.lastPage.toString(),10),
            page: parseInt(this.currentPageModel.toString(),10),
            step: parseInt(this.step!.toString(),10)
        };

        const pagesArray: (number | string)[] = [1];

        if (options.size < options.step * 2 + 1) {
            if (options.size === 2) {
                pagesArray.push(1);
                pagesArray.push(2);
            } else {
                for (let i = 2; i <= options.size;i++) {
                    pagesArray.push(i)
                }
            }
        }
        else if (options.page < options.step * 2 + 1) {
            for (let i=2; i < options.step * 2 + 2;i++) {
                pagesArray.push(i)
            }

            if (pagesArray[pagesArray.length-1] !== options.size) {
                pagesArray.push('...');
                pagesArray.push(this.lastPage);
            }
        }
        else if (options.page > options.size - options.step * 2) {
            pagesArray.push('...');

            for (let i=(options.size - options.step * 2 - 1); i < options.size + 1;i++) {

                if (i === 0 && options.step === 1) {
                    pagesArray.pop();
                } else {
                    pagesArray.push(i)
                }
            }
        }
        else {
            pagesArray.push('...');

            for (let i=(options.page - options.step); i < options.page + options.step + 1;i++) {
                pagesArray.push(i)
            }

            if (Number(pagesArray[pagesArray.length - 1]) + 1 !== this.lastPage) {
                pagesArray.push('...');
            }

            pagesArray.push(this.lastPage);

            if (pagesArray.length === options.size) {
                pagesArray.shift();
            }
        }

        return pagesArray;
    }

    get disabledNext(){
        return this.currentPageModel === this.lastPage
    }

    get disabledPrev(){
        return this.currentPageModel === 1
    }
}

</script>
