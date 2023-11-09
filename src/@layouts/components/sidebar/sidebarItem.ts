interface sidebarIterface{
  name:string;
  path:string;
  icon:string;
}
const sidebarItem:sidebarIterface[] = [
    {
      name:'Tableau de board',
      path:'dashboard',
      icon: 'mdi-view-dashboard-outline',
    },
    {
      name:'Vehicules',
      path:'cars',
      icon: 'mdi-car',
    },
    {
      name:'Reservations',
      path:'booking',
      icon: ' mdi-plus-network',
    },
    {
      name:'Transactions',
      path:'transactions',
      icon: 'mdi-square-edit-outline',
    },
    //  ,  {
    //   name:'Client',
    //   path:'prostpect',
    //   icon: 'mdi-account-group',
    // },
    {
      name:'Contacts',
      path:'contacts',
      icon: 'mdi-card-account-mail',
    },
    // {
    //   name:'Newsletter',
    //   path:'newsletter',
    //   icon: 'mdi-email-newsletter',
    // },
    {
      name:'Paramètre',
      path:'account-settings',
      icon: 'mdi-cog',
    }



  ]

  export default sidebarItem
