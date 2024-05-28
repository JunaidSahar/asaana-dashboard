<template>
  <div class="flex flex-col w-full py-20 gap-10">
    <div class="xl:w-5/12 lg:w-7/12 w-full mx-auto space-y-6 px-5">
      <div class="w-full border-4 p-3 rounded-2xl border-[#2B8EFD] flex items-center">
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
      <div class="flex items-center justify-center">
        <div class="bg-[#F4F4F6] text-[#7E7E7E] rounded-lg border-[#2B8EFD] border-2">
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
    <div class="container mx-auto px-5" v-if="statementResult">
      <div class="space-y-3" v-if="!isActiveArticles">
        <p class="text-lg font-medium">
          Created At:
          <span class="text-base font-normal">{{
            (new Date(statementResult?.question_analysis?.created_at)).toGMTString()
          }}</span>
        </p>
        <h2 class="text-2xl font-semibold">Evidences:</h2>
        <div class="flex flex-wrap gap-6 xl:justify-normal justify-center">
          <div
            v-for="(evidence, index) in statementResult?.question_analysis?.response_json
              .evidences"
            :key="index"
            @click="
              () => {
                if (openedEvidence !== index) {
                  openedEvidence = index;
                }
              }
            "
            class="shadow-lg max-w-[450px] h-max px-5 py-8 rounded-lg relative border-2 bg-white border-[#2B8EFD] min-h-64"
          >
            <img
              class="rounded-lg"
              :src="
                evidence?.image ||
                'https://www.popoptiq.com/wp-content/uploads/2018/08/articles-lead-image-082418-min.jpg'
              "
            />
            <p
              class="text-base lg:text-lg font-medium my-4"
              :class="openedEvidence == index ? '' : 'line-clamp-2'"
            >
              {{ evidence.info }}
            </p>

            <span v-if="openedEvidence == index" class="font-medium">
              Source:
              <a
                class="text-[#2B8EFD] font-medium text-lg"
                target="_blank"
                :href="evidence.article_url"
                >{{ evidence.source }}</a
              >
            </span>
            <div
              class="bg-[#2B8EFD] h-full w-full absolute top-2 left-2 -z-10 rounded-lg"
            />
          </div>
        </div>
      </div>
      <div v-else class="space-y-3">
        <h2 class="text-2xl font-semibold">News Articles:</h2>
        <div class="flex flex-wrap gap-6 items-center xl:justify-normal justify-center">
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
      "f3f045d0-63f4-441e-bc22-7cdfbe683387",
      "e24bfb45-56b5-43f1-97de-b9bc671e2560",
      "8f7df227-2346-434e-a27e-de3e0845e481",
      "7ef74b5b-dec5-4a1c-99bb-1a5efa26e835",
      "473340a4-5468-409b-a7e6-b28dc4d8454c",
      "8b278de8-a227-47a5-a352-c08d77c7315e",
      "a6df63dc-83c4-4c23-aac5-d1a1a02fe98b",
      "1181fb3e-14f5-426f-bc4c-abe0d3d84704",
    ],
    response: null,
    completed: true,
    user_id: "4d07e6c3-95b1-4f02-a416-7d6806fa69b5",
    response_json: {
      evidences: [
        {
          info:
            "Inflation remained above the Bank of England's 2% target partly because of high energy and food prices.",
          source: "BBC News",
          article_url: "https://www.bbc.com/news/business-35050087",
        },
        {
          info:
            "Worker shortages have also made it more expensive to find and keep staff. Energy prices surged again when Russia invaded Ukraine, cutting global supplies.",
          source: "BBC News",
          article_url: "https://www.bbc.com/news/business-35050087",
        },
        {
          info:
            "The Bank of England uses interest rates to try and keep inflation at 2%. When inflation was well above that target, it increased interest rates to 5.25%.",
          source: "BBC News",
          article_url: "https://www.bbc.com/news/business-35050087",
        },
        {
          info:
            "Pay, excluding bonuses, grew by 6% in the first three months of 2024, compared with the same period a year before. After taking inflation into account, it means pay went up by 1.9%.",
          source: "BBC News",
          article_url: "https://www.bbc.com/news/business-35050087",
        },
        {
          info:
            "At 2.3%, UK inflation has finally dropped below the rate for countries using the euro, which was 2.4% in April, the same as in March.",
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
        "Inflation remained above the Bank of England's 2% target partly because of high energy and food prices.Worker shortages have also made it more expensive to find and keep staff, external. Inflation soared in 2022 because oil and gas were in greater demand after the Covid pandemic. Energy prices surged again when Russia invaded Ukraine, cutting global supplies.Why inflation is worse for some people than othersHow much are prices rising for you? Try our calculatorYour device may not support this visualisationThe Bank of England uses interest rates to try and keep inflation at 2%.When inflation was well above that target, it increased interest rates to 5.25%.The idea is that if you make borrowing more expensive, people have less money to spend. People may also be encouraged to save more.In turn, this reduces demand for goods and slows price rises.But it is a balancing act - increasing borrowing costs risks harming the economy.For example, homeowners face higher mortgage repayments, which can outweigh better savings deals. Businesses also borrow less, making them less likely to create jobs. Some may cut staff and reduce investment. In May, the Bank of England held rates at 5.25% for a sixth time.Governor Andrew Bailey said the BoE needed to \"see more evidence\" that price rises had slowed but that he was \"optimistic that things are moving in the right direction\". He said the BoE expected inflation to fall \"close\" to its 2% target in the next couple of months.The next inflation figures are released on 19 June and the next interest rate decision is 20 June. What are UK interest rates and when will they fall?What a falling inflation rate means for your financesRates should be cut to 3.5% by end of 2025, IMF saysWages are rising faster than prices, official figures show.Pay, excluding bonuses, grew by 6% in the first three months of 2024, compared with the same period a year before. After taking inflation into account, it means pay went up by 1.9%.Five tips when asking for a pay riseHow to get a job: Six expert tips for finding workMany other countries have also seen inflation and higher interest rates. At 2.3%, UK inflation has finally dropped below the rate for countries using the euro, which was 2.4% in April, the same as in March. The European Central Bank raised its key interest rate to a record high 4% in September and has left it there. In the US, inflation hit 3.4% in the 12 months to April, down from 3.5% in March. The US central bank has kept its key interest rate at between 5.25% and 5.5% since July 2023. Comments can not be loadedTo load Comments you need to enable JavaScript in your browserâIf they see us they will bomb usâ - watch as BBC reaches a hidden warâs jungle front line'They leave boyfriends and girlfriends for war, and may never return'China's drills show it really doesn't like Taiwan's new presidentWhy Eritreans are at war with each other around the worldTikTok trainspotter Francis Bourgeois: 'Passion is cool'Why technology has not transformed buildingWeekly quiz:Â What North Korean song was banned after going viral?I couldn't bury my brother because of Sudan bombingThe many colours of Indiaâs election campaigns. VideoThe many colours of Indiaâs election campaignsThese elephants are dying on rail tracks - can AI save them?More murder mysteries with Sian Gibson and Johnny VegasGemma and Terry are now private investigators... bad onesâDo you ever really know anybody?'The untold story of an eccentric Inverness street trader who became an international fugitiveFrom a cosy cottage to a seaside suntrapJoin the judges as they scour the country on the search for Scotlandâs perfect padUnnerving paranormal tales from across AmericaDanny Robins turns his supernatural gaze to the other side of the AtlanticÂ© 2024 BBC. The BBC is not responsible for the content of external sites. Read about our approach to external linking.",
    },
    {
      id: "f3f045d0-63f4-441e-bc22-7cdfbe683387",
      created_at: "2024-05-24T02:35:09.576062+00:00",
      article_url: "https://www.bbc.co.uk/news/business-12196322#10",
      article_title: "How fast are prices rising in the UK?",
      article_text:
        "Inflation remained above the Bank of England's 2% target partly because of high energy and food prices.Worker shortages have also made it more expensive to find and keep staff, external. Inflation soared in 2022 because oil and gas were in greater demand after the Covid pandemic. Energy prices surged again when Russia invaded Ukraine, cutting global supplies.Why inflation is worse for some people than othersHow much are prices rising for you? Try our calculatorYour device may not support this visualisationThe Bank of England uses interest rates to try and keep inflation at 2%.When inflation was well above that target, it increased interest rates to 5.25%.The idea is that if you make borrowing more expensive, people have less money to spend. People may also be encouraged to save more.In turn, this reduces demand for goods and slows price rises.But it is a balancing act - increasing borrowing costs risks harming the economy.For example, homeowners face higher mortgage repayments, which can outweigh better savings deals. Businesses also borrow less, making them less likely to create jobs. Some may cut staff and reduce investment. In May, the Bank of England held rates at 5.25% for a sixth time.Governor Andrew Bailey said the BoE needed to \"see more evidence\" that price rises had slowed but that he was \"optimistic that things are moving in the right direction\". He said the BoE expected inflation to fall \"close\" to its 2% target in the next couple of months.The next inflation figures are released on 19 June and the next interest rate decision is 20 June. What are UK interest rates and when will they fall?What a falling inflation rate means for your financesRates should be cut to 3.5% by end of 2025, IMF saysWages are rising faster than prices, official figures show.Pay, excluding bonuses, grew by 6% in the first three months of 2024, compared with the same period a year before. After taking inflation into account, it means pay went up by 1.9%.Five tips when asking for a pay riseHow to get a job: Six expert tips for finding workMany other countries have also seen inflation and higher interest rates. At 2.3%, UK inflation has finally dropped below the rate for countries using the euro, which was 2.4% in April, the same as in March. The European Central Bank raised its key interest rate to a record high 4% in September and has left it there. In the US, inflation hit 3.4% in the 12 months to April, down from 3.5% in March. The US central bank has kept its key interest rate at between 5.25% and 5.5% since July 2023. Comments can not be loadedTo load Comments you need to enable JavaScript in your browserâIf they see us they will bomb usâ - watch as BBC reaches a hidden warâs jungle front line'They leave boyfriends and girlfriends for war, and may never return'China's drills show it really doesn't like Taiwan's new presidentWhy Eritreans are at war with each other around the worldTikTok trainspotter Francis Bourgeois: 'Passion is cool'Why technology has not transformed buildingWeekly quiz:Â What North Korean song was banned after going viral?I couldn't bury my brother because of Sudan bombingThe many colours of Indiaâs election campaigns. VideoThe many colours of Indiaâs election campaignsThese elephants are dying on rail tracks - can AI save them?More murder mysteries with Sian Gibson and Johnny VegasGemma and Terry are now private investigators... bad onesâDo you ever really know anybody?'The untold story of an eccentric Inverness street trader who became an international fugitiveFrom a cosy cottage to a seaside suntrapJoin the judges as they scour the country on the search for Scotlandâs perfect padUnnerving paranormal tales from across AmericaDanny Robins turns his supernatural gaze to the other side of the AtlanticÂ© 2024 BBC. The BBC is not responsible for the content of external sites. Read about our approach to external linking.",
    },
    {
      id: "e24bfb45-56b5-43f1-97de-b9bc671e2560",
      created_at: "2024-05-24T02:30:41.816469+00:00",
      article_url: "https://www.bbc.co.uk/news/uk-politics-69050402#1",
      article_title: "Chris Mason: Why did Sunak call an election now?",
      article_text:
        "But not everybody is in the loop on something like this. Decisions can be on a knife edge - and there have been those pushing Rishi Sunak to go sooner, Deputy Prime Minister Oliver Dowden among them. Those making that argument felt that things might not improve much and that the perceived desire of the electorate to be given a say soon might risk making any Conservative defeat worse if the appointment with voters was pushed back.In other words, do it now or it could get worse.The prime minister can also point to at least some of his objectives being fulfilled, or seemingly en route to being fulfilled. Today's inflation number can be chalked up as a success.Of course it's not purely down to the actions of the government.But governments get blamed when it's sky high, so it's reasonable to expect they will attempt to siphon off some credit when it falls - and it has.The wider economic picture appears a little brighter too.Then there is the plan to send some asylum seekers to Rwanda.It hasn't happened yet but it would appear flights could be imminent, perhaps even during the election campaign, although the claim that it will act as a deterrent will not be tested before polling day. And so the campaign begins.The Conservatives will say over and over again: be careful what you wish for. Labour and others will say over and over again it is time for change.The outcome will be quite something, whatever happens. Either the opinion polls are broadly right and the party of government will change, or they are wrong and it will be one of the biggest upsets in recent years.Rishi Sunak announces 4 July general electionElection poll tracker: How do the parties compare?A simple guide to the 4 July general electionComments can not be loadedTo load Comments you need to enable JavaScript in your browserâIf they see us they will bomb usâ - watch as BBC reaches a hidden warâs jungle front line'They leave boyfriends and girlfriends for war, and may never return'China's drills show it really doesn't like Taiwan's new presidentWhy Eritreans are at war with each other around the worldTikTok trainspotter Francis Bourgeois: 'Passion is cool'Why technology has not transformed buildingWeekly quiz:Â What North Korean song was banned after going viral?I couldn't bury my brother because of Sudan bombingThe many colours of Indiaâs election campaigns. VideoThe many colours of Indiaâs election campaignsThese elephants are dying on rail tracks - can AI save them?More murder mysteries with Sian Gibson and Johnny VegasGemma and Terry are now private investigators... bad onesâDo you ever really know anybody?'The untold story of an eccentric Inverness street trader who became an international fugitiveFrom a cosy cottage to a seaside suntrapJoin the judges as they scour the country on the search for Scotlandâs perfect padUnnerving paranormal tales from across AmericaDanny Robins turns his supernatural gaze to the other side of the AtlanticÂ© 2024 BBC. The BBC is not responsible for the content of external sites. Read about our approach to external linking.",
    },
    {
      id: "8f7df227-2346-434e-a27e-de3e0845e481",
      created_at: "2024-05-24T02:27:19.033991+00:00",
      article_url: "https://www.bbc.com/news/articles/cxeey91v540o#0",
      article_title: "Energy bills likely to fall in July under new cap",
      article_text:
        'Falling energy bills have already helped push inflation down to its lowest level in almost three years. Further falls would continue to feed through to the inflation rate, and may create more impetus for the Bank of England to reduce interest rates.Ofgem is also gathering views on the way the price cap is calculated, including whether there should be a change to standing charges.These are the fixed daily charges covering the costs of connecting to a supply, which have risen sharply in some areas.Sarah Osborn has shared three tips to keep on top of energy use during the warmer months:Read more here if you are struggling to pay energy billsAfter 19 months in power, the prime minister is facing the fight of his political life.Chancellor Jeremy Hunt compared the UK economy with other countries. We\'ve checked some of his claims.Similar powers to block new holiday lets in Wales have caused house price "crash" concerns.A Sussex council offers 15-minute public health funeral services, but sometimes no-one shows up. Copyright 2024 BBC. All rights reserved.  The BBC is not responsible for the content of external sites. Read about our approach to external linking. ',
    },
    {
      id: "7ef74b5b-dec5-4a1c-99bb-1a5efa26e835",
      created_at: "2024-05-24T02:35:37.905961+00:00",
      article_url: "https://www.bbc.co.uk/news/business-57764601#10",
      article_title: "When will interest rates come down?",
      article_text:
        "It was 2.3% in April, down sharply from the March figure due to a drop in energy prices.Speaking after May's decision to keep interest rates at 5.25%, the Bank's governor Andrew Bailey said he was \"optimistic that things are moving in the right direction\".But he said the Bank needed to \"see more evidence\" that price rises had slowed further before cutting interest rates.He left open the possibility of an interest rate cut at its next meeting on 20 June.  However, inflation in the services sector - which includes everything from hospitality to hairdressing - remains higher than expected, so some experts think a cut later in the summer is more likely. The Bank has to balance the need to slow price rises against the risk of damaging the economy, or having to raise interest rates again very soon in the future.Bank optimistic 'things moving in right direction'While UK inflation is currently close to the Bank's target of 2%, it is expected to rise a little over the course of the year before settling back down in early 2025.The International Monetary Fund (IMF) has recommended that UK interest rates should fall to 3.5% by the end of 2025.But the organisation, which advises its members on how to improve their economies, acknowledged that the Bank had to balance the risk of not cutting too quickly before inflation is under control.MortgagesJust under a third of households have a mortgage, according to the government's English Housing Survey, external.When interest rates rise or fall, more than 1.2 million people on tracker and standard variable rate (SVR) deals usually see an immediate change in their payments.More than eight in 10 mortgage customers have fixed-rate deals. While their monthly payments aren't immediately affected, any future deals are. Mortgage rates are much higher than they have been for much of the past decade.This means homebuyers and those remortgaging have to pay a lot more than if they had borrowed the same amount a few years ago. About 1.6 million deals will expire in 2024, according to banking trade body UK Finance.You can see how your mortgage may be affected by interest rate changes by using our calculator:A modern browser with JavaScript and a stable internet connection is required to view this interactive.At this rate, your payments could change byâ¦\n                            monthly changeto\n                            monthly totalThe information you provided on your monthly payments would not be sufficient to pay off your mortgage within the number of years given.This calculator does not constitute financial advice. It is based on a standard mortgage repayment formula based on the mortgage size and length and a fixed interest rate. It should be used as a guide only and does not represent the suitability, eligibility or availability of mortgage offers for users. For exact figures, users will need to approach an official mortgage lender.Interest rates fluctuate based on the Bank of England's base rate and market conditions.If you can't see the calculator, click here.Why mortgage rates are going up not downFive ways to save money on your mortgageCredit cards and loansBank of England interest rates also influence the amount charged on credit cards, bank loans and car loans. Lenders could decide to put their rates up if they expect higher interest rates from the Bank of England. However, if rates fall, interest payments may get cheaper.Low interest rates are good for borrowers, but bad for saversSavingsThe Bank of England interest rate also affects how much savers can earn on their money. Individual banks and building societies have been under pressure to pass on higher interest rates to customers.There are some good deals on the market and experts say customers should shop around, as money may be in accounts paying little or no interest.The UK's financial watchdog warned banks will face \"robust action\" if they offer unjustifiably low savings rates to customers.Interest rates have been increasing across the world over the past few years. However, in recent months, other central banks - including the US Federal Reserve and the European Central Bank - have also paused their rate rises, with the next moves expected to be downwards.The UK has had one of the highest interest rates in the G7 - the group representing the world's seven largest so-called \"advanced\" economies.Comments can not be loadedTo load Comments you need to enable JavaScript in your browserâIf they see us they will bomb usâ - watch as BBC reaches a hidden warâs jungle front line'They leave boyfriends and girlfriends for war, and may never return'China's drills show it really doesn't like Taiwan's new presidentWhy Eritreans are at war with each other around the worldTikTok trainspotter Francis Bourgeois: 'Passion is cool'Why technology has not transformed buildingWeekly quiz:Â What North Korean song was banned after going viral?I couldn't bury my brother because of Sudan bombingThe many colours of Indiaâs election campaigns. VideoThe many colours of Indiaâs election campaignsThese elephants are dying on rail tracks - can AI save them?More murder mysteries with Sian Gibson and Johnny VegasGemma and Terry are now private investigators... bad onesâDo you ever really know anybody?'The untold story of an eccentric Inverness street trader who became an international fugitiveFrom a cosy cottage to a seaside suntrapJoin the judges as they scour the country on the search for Scotlandâs perfect padUnnerving paranormal tales from across AmericaDanny Robins turns his supernatural gaze to the other side of the AtlanticÂ© 2024 BBC. The BBC is not responsible for the content of external sites. Read about our approach to external linking.",
    },
    {
      id: "473340a4-5468-409b-a7e6-b28dc4d8454c",
      created_at: "2024-05-24T02:36:05.625311+00:00",
      article_url: "https://www.bbc.co.uk/news/business-57764601#10",
      article_title: "When will interest rates come down?",
      article_text:
        "It was 2.3% in April, down sharply from the March figure due to a drop in energy prices.Speaking after May's decision to keep interest rates at 5.25%, the Bank's governor Andrew Bailey said he was \"optimistic that things are moving in the right direction\".But he said the Bank needed to \"see more evidence\" that price rises had slowed further before cutting interest rates.He left open the possibility of an interest rate cut at its next meeting on 20 June.  However, inflation in the services sector - which includes everything from hospitality to hairdressing - remains higher than expected, so some experts think a cut later in the summer is more likely. The Bank has to balance the need to slow price rises against the risk of damaging the economy, or having to raise interest rates again very soon in the future.Bank optimistic 'things moving in right direction'While UK inflation is currently close to the Bank's target of 2%, it is expected to rise a little over the course of the year before settling back down in early 2025.The International Monetary Fund (IMF) has recommended that UK interest rates should fall to 3.5% by the end of 2025.But the organisation, which advises its members on how to improve their economies, acknowledged that the Bank had to balance the risk of not cutting too quickly before inflation is under control.MortgagesJust under a third of households have a mortgage, according to the government's English Housing Survey, external.When interest rates rise or fall, more than 1.2 million people on tracker and standard variable rate (SVR) deals usually see an immediate change in their payments.More than eight in 10 mortgage customers have fixed-rate deals. While their monthly payments aren't immediately affected, any future deals are. Mortgage rates are much higher than they have been for much of the past decade.This means homebuyers and those remortgaging have to pay a lot more than if they had borrowed the same amount a few years ago. About 1.6 million deals will expire in 2024, according to banking trade body UK Finance.You can see how your mortgage may be affected by interest rate changes by using our calculator:A modern browser with JavaScript and a stable internet connection is required to view this interactive.At this rate, your payments could change byâ¦\n                            monthly changeto\n                            monthly totalThe information you provided on your monthly payments would not be sufficient to pay off your mortgage within the number of years given.This calculator does not constitute financial advice. It is based on a standard mortgage repayment formula based on the mortgage size and length and a fixed interest rate. It should be used as a guide only and does not represent the suitability, eligibility or availability of mortgage offers for users. For exact figures, users will need to approach an official mortgage lender.Interest rates fluctuate based on the Bank of England's base rate and market conditions.If you can't see the calculator, click here.Why mortgage rates are going up not downFive ways to save money on your mortgageCredit cards and loansBank of England interest rates also influence the amount charged on credit cards, bank loans and car loans. Lenders could decide to put their rates up if they expect higher interest rates from the Bank of England. However, if rates fall, interest payments may get cheaper.Low interest rates are good for borrowers, but bad for saversSavingsThe Bank of England interest rate also affects how much savers can earn on their money. Individual banks and building societies have been under pressure to pass on higher interest rates to customers.There are some good deals on the market and experts say customers should shop around, as money may be in accounts paying little or no interest.The UK's financial watchdog warned banks will face \"robust action\" if they offer unjustifiably low savings rates to customers.Interest rates have been increasing across the world over the past few years. However, in recent months, other central banks - including the US Federal Reserve and the European Central Bank - have also paused their rate rises, with the next moves expected to be downwards.The UK has had one of the highest interest rates in the G7 - the group representing the world's seven largest so-called \"advanced\" economies.Comments can not be loadedTo load Comments you need to enable JavaScript in your browserâIf they see us they will bomb usâ - watch as BBC reaches a hidden warâs jungle front line'They leave boyfriends and girlfriends for war, and may never return'China's drills show it really doesn't like Taiwan's new presidentWhy Eritreans are at war with each other around the worldTikTok trainspotter Francis Bourgeois: 'Passion is cool'Why technology has not transformed buildingWeekly quiz:Â What North Korean song was banned after going viral?I couldn't bury my brother because of Sudan bombingThe many colours of Indiaâs election campaigns. VideoThe many colours of Indiaâs election campaignsThese elephants are dying on rail tracks - can AI save them?More murder mysteries with Sian Gibson and Johnny VegasGemma and Terry are now private investigators... bad onesâDo you ever really know anybody?'The untold story of an eccentric Inverness street trader who became an international fugitiveFrom a cosy cottage to a seaside suntrapJoin the judges as they scour the country on the search for Scotlandâs perfect padUnnerving paranormal tales from across AmericaDanny Robins turns his supernatural gaze to the other side of the AtlanticÂ© 2024 BBC. The BBC is not responsible for the content of external sites. Read about our approach to external linking.",
    },
    {
      id: "8b278de8-a227-47a5-a352-c08d77c7315e",
      created_at: "2024-05-24T02:36:48.240107+00:00",
      article_url: "https://www.bbc.co.uk/news/business-57764601#10",
      article_title: "When will interest rates come down?",
      article_text:
        "It was 2.3% in April, down sharply from the March figure due to a drop in energy prices.Speaking after May's decision to keep interest rates at 5.25%, the Bank's governor Andrew Bailey said he was \"optimistic that things are moving in the right direction\".But he said the Bank needed to \"see more evidence\" that price rises had slowed further before cutting interest rates.He left open the possibility of an interest rate cut at its next meeting on 20 June.  However, inflation in the services sector - which includes everything from hospitality to hairdressing - remains higher than expected, so some experts think a cut later in the summer is more likely. The Bank has to balance the need to slow price rises against the risk of damaging the economy, or having to raise interest rates again very soon in the future.Bank optimistic 'things moving in right direction'While UK inflation is currently close to the Bank's target of 2%, it is expected to rise a little over the course of the year before settling back down in early 2025.The International Monetary Fund (IMF) has recommended that UK interest rates should fall to 3.5% by the end of 2025.But the organisation, which advises its members on how to improve their economies, acknowledged that the Bank had to balance the risk of not cutting too quickly before inflation is under control.MortgagesJust under a third of households have a mortgage, according to the government's English Housing Survey, external.When interest rates rise or fall, more than 1.2 million people on tracker and standard variable rate (SVR) deals usually see an immediate change in their payments.More than eight in 10 mortgage customers have fixed-rate deals. While their monthly payments aren't immediately affected, any future deals are. Mortgage rates are much higher than they have been for much of the past decade.This means homebuyers and those remortgaging have to pay a lot more than if they had borrowed the same amount a few years ago. About 1.6 million deals will expire in 2024, according to banking trade body UK Finance.You can see how your mortgage may be affected by interest rate changes by using our calculator:A modern browser with JavaScript and a stable internet connection is required to view this interactive.At this rate, your payments could change byâ¦\n                            monthly changeto\n                            monthly totalThe information you provided on your monthly payments would not be sufficient to pay off your mortgage within the number of years given.This calculator does not constitute financial advice. It is based on a standard mortgage repayment formula based on the mortgage size and length and a fixed interest rate. It should be used as a guide only and does not represent the suitability, eligibility or availability of mortgage offers for users. For exact figures, users will need to approach an official mortgage lender.Interest rates fluctuate based on the Bank of England's base rate and market conditions.If you can't see the calculator, click here.Why mortgage rates are going up not downFive ways to save money on your mortgageCredit cards and loansBank of England interest rates also influence the amount charged on credit cards, bank loans and car loans. Lenders could decide to put their rates up if they expect higher interest rates from the Bank of England. However, if rates fall, interest payments may get cheaper.Low interest rates are good for borrowers, but bad for saversSavingsThe Bank of England interest rate also affects how much savers can earn on their money. Individual banks and building societies have been under pressure to pass on higher interest rates to customers.There are some good deals on the market and experts say customers should shop around, as money may be in accounts paying little or no interest.The UK's financial watchdog warned banks will face \"robust action\" if they offer unjustifiably low savings rates to customers.Interest rates have been increasing across the world over the past few years. However, in recent months, other central banks - including the US Federal Reserve and the European Central Bank - have also paused their rate rises, with the next moves expected to be downwards.The UK has had one of the highest interest rates in the G7 - the group representing the world's seven largest so-called \"advanced\" economies.Comments can not be loadedTo load Comments you need to enable JavaScript in your browserâIf they see us they will bomb usâ - watch as BBC reaches a hidden warâs jungle front line'They leave boyfriends and girlfriends for war, and may never return'China's drills show it really doesn't like Taiwan's new presidentWhy Eritreans are at war with each other around the worldTikTok trainspotter Francis Bourgeois: 'Passion is cool'Why technology has not transformed buildingWeekly quiz:Â What North Korean song was banned after going viral?I couldn't bury my brother because of Sudan bombingThe many colours of Indiaâs election campaigns. VideoThe many colours of Indiaâs election campaignsThese elephants are dying on rail tracks - can AI save them?More murder mysteries with Sian Gibson and Johnny VegasGemma and Terry are now private investigators... bad onesâDo you ever really know anybody?'The untold story of an eccentric Inverness street trader who became an international fugitiveFrom a cosy cottage to a seaside suntrapJoin the judges as they scour the country on the search for Scotlandâs perfect padUnnerving paranormal tales from across AmericaDanny Robins turns his supernatural gaze to the other side of the AtlanticÂ© 2024 BBC. The BBC is not responsible for the content of external sites. Read about our approach to external linking.",
    },
    {
      id: "a6df63dc-83c4-4c23-aac5-d1a1a02fe98b",
      created_at: "2024-05-24T02:28:36.241048+00:00",
      article_url: "https://www.bbc.com/news/articles/c9rr73w103vo#1",
      article_title: "How Rishi Sunak sprang election surprise on Tories",
      article_text:
        "James Nation, a former Treasury civil servant who is Mr Sunak’s deputy director of policy, has been working on the manifesto for several months, canvassing ideas from Conservative think tanks. And in hindsight it is possible to see last week’s set-piece events - Mr Sunak’s speech about the dangerous world on the Monday; Jeremy Hunt’s attack on Labour’s economic policies on the Friday - as dress rehearsals.You could look back a little further to late April and Mr Sunak’s trip to Germany where he announced ambitions to increase defence spending as another attempt to entrench general election dividing lines.Mr Sunak is thought to have become particularly exercised about the possibility that if he waited until deep into 2024 to go to the polls, the public would perceive him to be a “squatter” in No 10.And what both sides of the election timing argument agreed on was that Mr Sunak needed to find a way, whenever he called the election, of seizing the initiative and framing the argument. The inflation statistics on Wednesday morning - long expected to deliver a sharp drop in the rate of price rises - became an obvious launching point.“Inflation is the number one thing he had to deal with when he came in as PM,” a senior Conservative source said. “Undeniably we are back to normal now. We have done the central mission of his premiership - to deal with inflation and get the economy on the right path.”Pointing to Mr Sunak’s ambitions to reform welfare and to enact the Rwanda small boats policy among other policies, the source continued: “Frankly we now need a mandate to be able to do those big bold things to put the country on the right path.”Another reason to call an election for July became clearer during Mr Sunak’s interviews this morning, when he admitted that the Rwanda small boats policy would not begin until after 4 July's polling day. Given Labour’s policy is to repeal the Rwanda plan, that sets up a clear dividing line on how to deal with small boats - without the government having to account for whether the flights have had any deterrent effect, as they would have had to if the election were in October or November after some flights had taken off.Yet the timing could cut both ways strategically. One influential Conservative MP on the right of the party declared during Wednesday’s febrile speculation that a summer election would be “madness”, telling me: “I know what question you’re going to ask us again and again. \"You’ll say we’ve been banging on about Rwanda for years and we’ve only managed to fly one migrant out there - and we paid him to go”.The biggest reason so many Conservatives were aghast that Mr Sunak decided to call an election is that the party remains way behind in the opinion polls. Others give this short shrift. “It’s totally the right decision,” one ally of Mr Sunak said. “The impulse for 'something will come up' is strong, but it’s a hostage to fortune.“The economy is improving, he has the proof points he needs on that. Leaving it longer wouldn't have improved the political position at all.”Sir Keir Starmer and Rishi Sunak are hoping this election marks the end of an era of SNP domination.Rishi Sunak promises financial stability while Keir Starmer says a vote for him is vote for change.Sir Michael says it has been \"the honour of my life\" to serve the town he was born in.Rishi Sunak's flagship ban on smoking for people born after 2009 runs out of time to pass into law.Some party leaders say they are surprised by an election in six weeks time, others say they have been waiting patiently.Copyright 2024 BBC. All rights reserved.  The BBC is not responsible for the content of external sites. Read about our approach to external linking. ",
    },
    {
      id: "1181fb3e-14f5-426f-bc4c-abe0d3d84704",
      created_at: "2024-05-24T02:29:16.026483+00:00",
      article_url: "https://www.bbc.com/news/articles/cxxxn5n09x5o#1",
      article_title: "Sunak attacks Welsh government on campaign visit",
      article_text:
        '"The Welsh NHS, run by the Labour government, is the worst performing in Great Britain - waiting times the longest, emergency times the worst. That\'s the reality of Labour in Wales."The Welsh government objects to the term blanket - saying it is an incorrect way to describe a default speed limit limit which applies in most residential areas which were previously 30mph.Mr Sunak said he had a “strong record of investing in Wales”, saying his decision to scrap the second leg of the HS2 high speed rail line, between Birmingham and Manchester, was “going to mean a billion pounds” would be spent electrifying the north Wales main line.Earlier in the visit Mr Sunak was met with a moment of silence when he asked if the European football championships would be a source of revenue."So, you\'re looking forward to all the football?," he asked. Wales did not qualify for the tournament.One individual answered: "We\'re not so invested in it," to which another responded: "That\'s because you guys aren\'t in it".The prime minister added: "It\'ll be a good summer of sport."Labour\'s shadow Welsh Secretary, Jo Stevens, said on social media platform X it was "another own goal for Rishi".Later, one of the business owners pictured sat next to Mr Sunak suggested he would not be supporting his party.Lee Skeet, owner of Jackson\'s oyster bar in Cardiff, said on X he was "just asked to be there to talk about hospitality".First Minister Vaughan Gething said on Thursday: “We know the difference that a Labour government makes, and we know that two Labour governments at either end of the M4 can transform Wales and transform Britain.”In an interview Mr Gething said the criticism of the Welsh government was “what you’d expect from a Tory prime minister who knows he’s in desperate trouble.“I want a change election for people to look at the position you find yourself in with your family.“Are you better off now than four and a half years ago or 14 years ago?“Are you optimistic about the future of the country with four more years of Rishi Sunak, after Liz Truss, after Boris Johnson, after David Cameron?”Asked about a poll by Redfield and Wilton Strategies which suggested his approval rating had fallen in recent weeks, Mr Gething said: “I think you look at what’s happened in the last few weeks, it’s no surprise people take a different view.”He said the donation row will not overshadow Labour’s campaign, and that voters were not asking about it.A Labour MP appeared to distance herself from Mr Gething when she appeared on the BBC Wales Live television programme on Wednesday evening.Asked about the donation controversies that dominated his first few weeks as first minister, Llanelli Labour MP Nia Griffith said: “I think people see this very much as a race between Rishi Sunak and Keir Starmer.“We will be focusing on that and I’m sure voters will understand that.”She also said Labour was "definitely not going to touch" leftover money from his campaign donations.Vaughan Gething has now agreed to give the remaining £31,000 to charity, rather than the Labour Party as would normally happen.During his leadership campaign Mr Gething accepted £200,000 from a company owned by a man that was previously convicted of environmental offences – he raised more than £250,000.By Gareth Lewis, BBC Wales political editorAfter it rained on his parade yesterday Rishi Sunak at least appeared to avoid any puns about his organisational skills after a visit to a brewery - brief faux pas about the football aside.The trip to Barry on day one of the campaign was no surprise - it is in the Vale of Glamorgan, one of the Conservative seats most at risk.Also of no surprise was the attack line - what he sees as the Welsh Labour government’s track record here.But that is not without risk. How much will voters take into account things like 20mph and the NHS - both Welsh government responsibilities - when they’re voting in a UK general election?And it also assumes some voters are willing to overlook what they might see as big issues with the Conservative record at UK level over the past 14 years.The election is the first since a major boundary review, which will cut the number of MPs in Wales from 40 to 32.All seats will see their boundaries change, with the exception of Ynys Môn.Welsh Labour are hoping to expand their dominance in Wales, while the Conservatives are defending the ground they won in 2019.At the last election Welsh Labour won 22 seats - still the largest party despite the performance of the Conservatives.Plaid Cymru is currently the third largest Welsh group of MPs in Westminster, with four seats.Its leader leader spent Thursday afternoon visiting what the party called its “key battleground seats” of Carmarthen, Ceredigion Preseli, Dwyfor Meirionydd and Ynys Môn.In Carmarthen, Rhun ap Iorwerth told BBC Wales he was "pretty sure" the Conservatives would lose power in this election, but he appealed to "people in all parts of Wales" to vote to ensure the nation “is never ignored at Westminster”.The Conservatives and Labour would “not make Wales a priority”, he warned."In this election, we\'re seeing a significant decrease in the number of MPs from Wales so it\'s more critical than ever, arguably, that we make sure that we have MPs in Plaid Cymru that make sure we are not ignored."The Conservatives will be thrown out at this election, I’m pretty sure of that."Labour will probably get the keys to 10 Downing Street, but they take Wales for granted and we have to have Plaid Cymru there making sure that we stand for fairness for Wales and its communities."Speaking on BBC Radio Cymru\'s Dros Frecwast Jane Dodds, leader of the Liberal Democrats in Wales, said they will be "campaigning hard". "Most of the people who have voted for the Conservatives will not want to give their vote this time to Labour, so we have an opportunity to talk to them and ensure that we are their choice," she said.Carla Denyer, co-leader of the Green Party of England and Wales, said they plan to stand a candidate in every constituency. "If we manage to do that it will be the first time we have done that in the party\'s history."We\'re prioritising that because we want to make sure everyone has the opportunity to vote Green," she said.Sir Keir Starmer and Rishi Sunak are hoping this election marks the end of an era of SNP domination.Rishi Sunak promises financial stability while Keir Starmer says a vote for him is vote for change.Lib Dem leader Sir Ed Davey is calling for patients to have the right to see a GP within seven days.Sir Michael says it has been "the honour of my life" to serve the town he was born in.Rishi Sunak\'s flagship ban on smoking for people born after 2009 runs out of time to pass into law.Copyright 2024 BBC. All rights reserved.  The BBC is not responsible for the content of external sites. Read about our approach to external linking. ',
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

const openedEvidence = ref();
</script>
