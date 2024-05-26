<template>
  <div class="flex flex-col w-full py-20 gap-10">
    <div class="xl:w-5/12 lg:w-7/12 w-full mx-auto space-y-6 px-5">
      <div
        class="w-full border-4 p-3 rounded-2xl border-[#2B8EFD] flex items-center"
      >
        <input
          placeholder="write a statment"
          class="focus:border-none w-full focus:outline-0"
          v-model="statementInput"
        />
        <button
          @click="updateResults"
          class="bg-[#2B8EFD] flex items-center gap-2 p-2 text-white rounded-lg"
        >
          <span> Analyze </span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.33333 14H4.66667C4.66389 12.7735 4.90331 11.5585 5.37119 10.4248C5.83907 9.29099 6.5262 8.26076 7.39317 7.39318C8.24226 6.54126 9.24971 5.86355 10.3588 5.39818C12.6449 4.44843 15.2119 4.43126 17.5105 5.35034C17.533 6.10572 17.8492 6.82256 18.3919 7.34847C18.9346 7.87439 19.661 8.16792 20.4167 8.16668C22.0337 8.16668 23.3333 6.86701 23.3333 5.25001C23.3333 3.63301 22.0337 2.33334 20.4167 2.33334C19.6128 2.33334 18.886 2.65534 18.3598 3.17918C15.5237 2.04401 12.2663 2.06151 9.45233 3.24801C8.06533 3.83099 6.80518 4.67861 5.74233 5.74351C4.67696 6.80576 3.82892 8.06554 3.24567 9.45234C2.6404 10.8919 2.33017 12.4384 2.33333 14ZM22.6018 17.6423C22.134 18.753 21.462 19.7517 20.6068 20.6068C19.7517 21.462 18.753 22.134 17.6412 22.6018C15.3551 23.5516 12.7881 23.5688 10.4895 22.6497C10.467 21.8943 10.1508 21.1775 9.60814 20.6515C9.06545 20.1256 8.33905 19.8321 7.58333 19.8333C5.96633 19.8333 4.66667 21.133 4.66667 22.75C4.66667 24.367 5.96633 25.6667 7.58333 25.6667C8.38717 25.6667 9.114 25.3447 9.64017 24.8208C11.0256 25.3803 12.5059 25.6675 14 25.6667C16.2943 25.6711 18.5388 24.9978 20.4518 23.7313C22.3649 22.4648 23.8612 20.6615 24.7532 18.5477C25.3592 17.1083 25.6699 15.5618 25.6667 14H23.3333C23.3363 15.2509 23.0875 16.4896 22.6018 17.6423Z"
              fill="white"
            />
            <path
              d="M14 8.70566C11.081 8.70566 8.70567 11.081 8.70567 14C8.70567 16.919 11.081 19.2943 14 19.2943C16.919 19.2943 19.2943 16.919 19.2943 14C19.2943 11.081 16.919 8.70566 14 8.70566ZM14 16.961C12.3678 16.961 11.039 15.6322 11.039 14C11.039 12.3678 12.3678 11.039 14 11.039C15.6322 11.039 16.961 12.3678 16.961 14C16.961 15.6322 15.6322 16.961 14 16.961Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div class="flex items-center justify-center md:hidden">
        <div
          class="bg-[#F4F4F6] text-[#7E7E7E] rounded-lg border-[#2B8EFD] border-2"
        >
          <button
            @click="isActiveArticles = !isActiveArticles"
            class="p-4"
            :class="!isActiveArticles ? 'text-white bg-[#2B8EFD]' : ''"
          >
            Question Analysis
          </button>
          <button
            @click="isActiveArticles = !isActiveArticles"
            class="p-4"
            :class="isActiveArticles ? 'text-white bg-[#2B8EFD]' : ''"
          >
            News Articles
          </button>
        </div>
      </div>
    </div>
    <div class="lg:container mx-auto px-5" v-if="statementResult">
      <div class="space-y-3" v-if="!isActiveArticles">
        <p class="text-lg font-medium">
          Created At:
          <span class="text-base font-normal">{{
            new Date(statementResult?.question_analysis?.created_at)
          }}</span>
        </p>
        <div class="flex items-start gap-8">
          <div class="md:w-1/2 space-y-3">
            <h2 class="text-2xl font-semibold">Evidences:</h2>
            <div
              class="flex flex-wrap gap-6 items-center md:justify-normal justify-center"
            >
              <div
                v-for="(evidence, index) in statementResult?.question_analysis
                  ?.response_json.evidences"
                :key="index"
                class="shadow-lg max-w-[280px] flex flex-col justify-between px-5 py-8 rounded-lg relative border-2 bg-white border-[#2B8EFD] min-h-64"
              >
                <a
                  class="text-[#2B8EFD] font-medium text-lg"
                  target="_blank"
                  :href="evidence.article_url"
                  >{{ evidence.source }}</a
                >
                <p class="text-xl font-medium line-clamp-5">
                  {{ evidence.info }}
                </p>
                <div
                  class="bg-[#2B8EFD] h-full w-full absolute top-2 left-2 -z-10 rounded-lg"
                />
              </div>
            </div>
          </div>
          <div class="w-1/2 space-y-3 md:block hidden">
            <h2 class="text-2xl font-semibold">News Articles:</h2>
            <div
              class="flex flex-wrap gap-6 items-center md:justify-normal justify-center"
            >
              <div
                v-for="(article, index) in statementResult?.news_articles"
                :key="index"
                class="shadow-lg max-w-[330px] flex flex-col justify-between px-5 py-8 rounded-lg relative border-2 bg-white border-[#2B8EFD] min-h-72"
              >
                <div class="space-y-2">
                  <p class="text-xl font-medium line-clamp-5">
                    {{ article.article_title }}
                  </p>
                  <p class="line-clamp-4">{{ article.article_text }}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p>{{ formatDate(article.created_at) }}</p>
                  <a
                    class="text-[#2B8EFD] font-medium text-lg"
                    target="_blank"
                    :href="article.article_url"
                    >Read more</a
                  >
                </div>
                <div
                  class="bg-[#2B8EFD] h-full w-full absolute top-2 left-2 -z-10 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="space-y-3">
        <h2 class="text-2xl font-semibold">News Articles:</h2>
        <div
          class="flex flex-wrap gap-6 items-center xl:justify-normal justify-center"
        >
          <div
            v-for="(article, index) in statementResult?.news_articles"
            :key="index"
            class="shadow-lg max-w-[420px] flex flex-col justify-between px-5 py-8 rounded-lg relative border-2 bg-white border-[#2B8EFD] min-h-72"
          >
            <div class="space-y-2">
              <p class="text-2xl font-medium line-clamp-5">
                {{ article.article_title }}
              </p>
              <p class="line-clamp-4">{{ article.article_text }}</p>
            </div>
            <div class="flex items-center justify-between">
              <p>{{ formatDate(article.created_at) }}</p>
              <a
                class="text-[#2B8EFD] font-medium text-lg"
                target="_blank"
                :href="article.article_url"
                >Read more</a
              >
            </div>
            <div
              class="bg-[#2B8EFD] h-full w-full absolute top-2 left-2 -z-10 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center min-h-96">
      <p class="text-2xl font-medium">Write a statement to get results</p>
    </div>
  </div>
</template>

<script setup>
const isActiveArticles = ref(false);
const statementInput = ref("");
const statementResult = ref("");
const dataa = {
  question_analysis: {
    id: "46afb1cc-c277-4ce6-8f74-8a7c9257ea5d",
    created_at: "2024-05-25T06:49:44.606125+00:00",
    question: "Should inflation be a national priority for govenment?",
    article_ids: [
      "ffccdeab-0bbb-454c-bd1b-90309297b044",
      "2fb90fb8-dd34-4a37-9f4e-f8e7ed4a0eb0",
    ],
    response: null,
    completed: true,
    user_id: "4d07e6c3-95b1-4f02-a416-7d6806fa69b5",
    response_json: {
      evidences: [
        {
          info: "Inflation remained above the Bank of England's 2% target partly because of high energy and food prices.",
          source: "BBC News",
          article_url: "https://www.bbc.com/news/business-35050087",
        },
        {
          info: "Worker shortages have also made it more expensive to find and keep staff. Energy prices surged again when Russia invaded Ukraine, cutting global supplies.",
          source: "BBC News",
          article_url: "https://www.bbc.com/news/business-35050087",
        },
        {
          info: "The Bank of England uses interest rates to try and keep inflation at 2%. When inflation was well above that target, it increased interest rates to 5.25%.",
          source: "BBC News",
          article_url: "https://www.bbc.com/news/business-35050087",
        },
      ],
    },
  },
  news_articles: [
    {
      id: "ffccdeab-0bbb-454c-bd1b-90309297b044",
      created_at: "2024-05-24T02:36:14.497915+00:00",
      article_url: "https://www.bbc.com/news/articles/c51nykexzj8o#10",
      article_title: "Energy bills predicted to fall by 7% in July",
      article_text:
        'A fall in energy bills would feed through to the rate of inflation, and may create more impetus for the Bank of England to reduce interest rates.Read more hereAfter 19 months in power, the prime minister is facing the fight of his political life.Chancellor Jeremy Hunt compared the UK economy with other countries. We\'ve checked some of his claims.Similar powers to block new holiday lets in Wales have caused house price "crash" concerns.A Sussex council offers 15-minute public health funeral services, but sometimes no-one shows up. Copyright 2024 BBC. All rights reserved.  The BBC is not responsible for the content of external sites. Read about our approach to external linking. ',
    },
    {
      id: "2fb90fb8-dd34-4a37-9f4e-f8e7ed4a0eb0",
      created_at: "2024-05-24T02:35:47.95142+00:00",
      article_url: "https://www.bbc.co.uk/news/business-12196322#10",
      article_title: "How fast are prices rising in the UK?",
      article_text:
        "Inflation remained above the Bank of England's 2% target partly because of high energy and food prices.Worker shortages have also made it more expensive to find and keep staff, external. Inflation soared in 2022 because oil and gas were in greater demand after the Covid pandemic. Energy prices surged again when Russia invaded Ukraine, cutting global supplies.Why inflation is worse for some people than othersHow much are prices rising for you? Try our calculatorYour device may not support this visualisationThe Bank of England uses interest rates to try and keep inflation at 2%.When inflation was well above that target, it increased interest rates to 5.25%.The idea is that if you make borrowing more expensive, people have less money to spend. People may also be encouraged to save more.",
    },
  ],
};

function updateResults() {
  // you can call API here to update the statementResult & input value is in statementInput ref
  //dataa should be the response of the API
  statementResult.value = dataa;
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
</script>
