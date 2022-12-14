import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      { 
        path: "/employees",
        name: "employees",
        component: () => import("../views/employees/Index.vue"),
      },
      {
        path: "/employees/create",
        name: "employee.create",
        component: () => import("../views/employees/Create.vue"),
      },
      {
        path: "/employees/show/:id",
        name: "employees.show",
        component: () => import("../views/employees/Show.vue"),
      },
      {
        path: "/employees/update/:id",
        name: "employees.update",
        component: () => import("../views/employees/Update.vue"),
      },
      {
        path: "/company",
        name: "company",
        component: () => import("../views/company/Index.vue"),
      },
      {
        path: "/company/create",
        name: "company.create",
        component: () => import("../views/company/Create.vue"),
      },
      {
        path: "/company/update/:id",
        name: "company.update",
        component: () => import("../views/company/Update.vue"),
      },
      {
        path: "/posisition",
        name: "posisition",
        component: () => import("../views/posisition/Index.vue"),
      },
      {
        path: "/posisition/create",
        name: "posisition.create",
        component: () => import("../views/posisition/Create.vue"),
      },
      {
        path: "/posisition/update/:id",
        name: "posisition.update",
        component: () => import("../views/posisition/Update.vue"),
      },
      {
        path: "/division",
        name: "division",
        component: () => import("../views/division/Index.vue"),
      },
      {
        path: "/division/create",
        name: "division.create",
        component: () => import("../views/division/Create.vue"),
      },
      {
        path: "/division/update/:id",
        name: "division.update",
        component: () => import("../views/division/Update.vue"),
      },
      {
        path: "/allowancetype",
        name: "allowancetype",
        component: () => import("../views/allowancetype/Index.vue"),
      },
      {
        path: "/allowancetype/create",
        name: "allowancetype.create",
        component: () => import("../views/allowancetype/Create.vue"),
      },
      {
        path: "/allowancetype/update/:id",
        name: "allowancetype.update",
        component: () => import("../views/allowancetype/Update.vue"),
      },
      {
        path: "/furloughtype",
        name: "furloughtype",
        component: () => import("../views/furloughtype/Index.vue"),
      },
      {
        path: "/furloughtype/create",
        name: "furloughtype.create",
        component: () => import("../views/furloughtype/Create.vue"),
      },
      {
        path: "/furloughtype/update/:id",
        name: "furloughtype.update",
        component: () => import("../views/furloughtype/Update.vue"),
      },
      {
        path: "/salary",
        name: "salary",
        component: () => import("../views/salary/Index.vue"),
      },
      {
        path: "/salary/create",
        name: "salary.create",
        component: () => import("../views/salary/Create.vue"),
      },
      {
        path: "/salary/show/:id",
        name: "salary.show",
        component: () => import("../views/salary/Show.vue"),
      },
      {
        path: "/salary/update/:id",
        name: "salary.update",
        component: () => import("../views/salary/Update.vue"),
      },
      {
        path: "/daily-salary",
        name: "daily-salary",
        component: () => import("../views/reportsalary/DailySalary.vue"),
      },
      {
        path: "/contract-salary",
        name: "contract-salary",
        component: () => import("../views/reportsalary/ContractSalary.vue"),
      },
      {
        path: "/furlough",
        name: "furlough",
        component: () => import("../views/furlough/Index.vue"),
      },
      {
        path: "/furlough/create",
        name: "furlough.create",
        component: () => import("../views/furlough/Create.vue"),
      },
      {
        path: "/furlough/show/:id",
        name: "furlough.show",
        component: () => import("../views/furlough/Show.vue"),
      },
      {
        path: "/furlough/:id",
        name: "furlough.update",
        component: () => import("../views/furlough/Update.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
