import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import TechAdvantageView from "../views/TechAdvantageView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";

// 导入子页面
// 首页子页面
const CompetitiveEdge = () =>
    import ("../views/home/CompetitiveEdge.vue");
const Technologies = () =>
    import ("../views/home/Technologies.vue");
const Products = () =>
    import ("../views/home/Products.vue");
const LatestNews = () =>
    import ("../views/home/LatestNews.vue");

// 产品中心子页面
const DigitalTrident = () =>
    import ("../views/solutions/DigitalTrident.vue");
const SmartTrident = () =>
    import ("../views/solutions/SmartTrident.vue");
const CyberTrident = () =>
    import ("../views/solutions/CyberTrident.vue");
const CentralMonitoring = () =>
    import ("../views/solutions/CentralMonitoring.vue");

// 技术优势子页面
const DigitalTwin = () =>
    import ("../views/tech/DigitalTwin.vue");
const AI = () =>
    import ("../views/tech/AI.vue");
const AIoT = () =>
    import ("../views/tech/AIoT.vue");
const BigData = () =>
    import ("../views/tech/BigData.vue");

// 关于我们子页面
const JanaCase = () =>
    import ("../views/about/JanaCase.vue");

// 联系我们子页面
const CompanyProfile = () =>
    import ("../views/contact/CompanyProfile.vue");
const TeamIntro = () =>
    import ("../views/contact/TeamIntro.vue");
const BusinessPartner = () =>
    import ("../views/contact/BusinessPartner.vue");
const FormSubmission = () =>
    import ("../views/contact/FormSubmission.vue");
const PartnerMap = () =>
    import ("../views/contact/PartnerMap.vue");

const router = createRouter({
    history: createWebHashHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "home",
            component: HomeView,
            children: [
                { path: "competitive-edge", component: CompetitiveEdge },
                { path: "technologies", component: Technologies },
                { path: "products", component: Products },
                { path: "latest-news", component: LatestNews },
            ],
        },
        {
            path: "/solutions",
            name: "solutions",
            component: ProductView,
            children: [
                { path: "digital-trident", component: DigitalTrident },
                { path: "smart-trident", component: SmartTrident },
                { path: "cyber-trident", component: CyberTrident },
                { path: "central-monitoring", component: CentralMonitoring },
            ],
        },
        {
            path: "/tech-advantage",
            name: "tech-advantage",
            component: TechAdvantageView,
            children: [
                { path: "digital-twin", component: DigitalTwin },
                { path: "ai", component: AI },
                { path: "aiot", component: AIoT },
                { path: "big-data", component: BigData },
            ],
        },
        {
            path: "/about",
            name: "about",
            component: AboutView,
            children: [{ path: "jana-case", component: JanaCase }],
        },
        {
            path: "/contact",
            name: "contact",
            component: ContactView,
            children: [
                { path: "company-profile", component: CompanyProfile },
                { path: "team-intro", component: TeamIntro },
                { path: "business-partner", component: BusinessPartner },
                { path: "form", component: FormSubmission },
                { path: "partner-map", component: PartnerMap },
            ],
        },
    ],
});

export default router;