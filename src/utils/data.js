/**
 * 
 * option - {
 *  name:
 *  id:
 *  icon:
 *  category:
 *  nestedOptions:
 * }
 * 
 */


const initialOptions = [
    {
        id: 'all_res',
        name: 'All Resources',
        value: 'AllResources',
        type: 'OPTION',
        icon: 'allResources',
        options: [
            {
                name: 'Record Variables',
                type: 'CATEGORY',
                options: [
                    {
                        id: 'account_id_1',
                        name: 'Account',
                        value: 'Account',
                        type: 'OPTION',
                        icon: 'account',
                        options: [
                            {
                                name: 'Relationship Fields',
                                type: 'CATEGORY',
                                options: [
                                    {
                                        id: 'acc_op_0',
                                        name: 'Created By ID',
                                        value: 'CreatedBy',
                                        icon: 'addDate',
                                        type: 'OPTION',
                                        options: [
                                            {
                                                name: 'Relationship Fields',
                                                type: 'CATEGORY',
                                                options: [
                                                    {
                                                        id: 'acc_op_ch_0',
                                                        name: 'Created By ID',
                                                        value: 'CreatedBy',
                                                        icon: 'addDate',
                                                        type: 'OPTION'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'acc_op_2',
                                        name: 'D&B Company ID',
                                        value: 'D&BCompany',
                                        icon: 'default',
                                        type: 'OPTION',
                                        options: [
                                            {
                                                name: 'Relationship Fields',
                                                type: 'CATEGORY',
                                                options: [
                                                    {
                                                        id: 'acc_op_db_0',
                                                        name: 'Created By ID',
                                                        value: 'CreatedBy',
                                                        icon: 'addDate',
                                                        type: 'OPTION'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'acc_op_1',
                                        name: 'Last Modified By ID',
                                        value: 'LastModifiedBy',
                                        icon: 'modified',
                                        type: 'OPTION',
                                        options: [
                                            {
                                                name: 'Relationship Fields',
                                                type: 'CATEGORY',
                                                options: [
                                                    {
                                                        id: 'acc_op_lmb_0',
                                                        name: 'Last Modified By ID',
                                                        value: 'LastModifiedBy',
                                                        icon: 'modified',
                                                        type: 'OPTION',
                                                        options: [
                                                            {
                                                                name: 'Relationship Fields',
                                                                type: 'CATEGORY',
                                                                options: [
                                                                    {
                                                                        id: 'acc_op_lmb_0_1',
                                                                        name: 'ID',
                                                                        value: 'id',
                                                                        icon: 'default',
                                                                        type: 'OPTION'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'acc_op_3',
                                        name: 'Master Record ID',
                                        value: 'MasterRecord',
                                        icon: 'masterRecord',
                                        type: 'OPTION',
                                        options: [
                                            {
                                                name: 'Relationship Fields',
                                                type: 'CATEGORY',
                                                options: [
                                                    {
                                                        id: 'master_rc_op_ch_0',
                                                        name: 'Created By ID',
                                                        value: 'CreatedBy',
                                                        icon: 'addDate',
                                                        type: 'OPTION'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'acc_op_4',
                                        name: 'Operating Hour ID',
                                        value: 'OperatingHour',
                                        icon: 'default',
                                        type: 'OPTION',
                                        options: [
                                            {
                                                name: 'Relationship Fields',
                                                type: 'CATEGORY',
                                                options: [
                                                    {
                                                        id: 'oph_op_ch_0',
                                                        name: 'Created By ID',
                                                        value: 'CreatedBy',
                                                        icon: 'addDate',
                                                        type: 'OPTION'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'acc_op_5',
                                        name: 'Owner ID',
                                        value: 'Owner',
                                        icon: 'account',
                                        type: 'OPTION',
                                        options: [
                                            {
                                                name: 'Relationship Fields',
                                                type: 'CATEGORY',
                                                options: [
                                                    {
                                                        id: 'owner_op_ch_0',
                                                        name: 'Created By ID',
                                                        value: 'CreatedBy',
                                                        icon: 'addDate',
                                                        type: 'OPTION'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'acc_op_7',
                                        name: 'Custom ID',
                                        value: 'CustomId',
                                        icon: 'masterRecord',
                                        type: 'OPTION'
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        id: 'contact_id_0',
                        name: 'Contact',
                        value: 'Contact',
                        icon: 'contact',
                        type: 'OPTION',
                        options: [
                            {
                                name: 'Relationship Fields',
                                type: 'CATEGORY',
                                options: [
                                    {
                                        id: 'con_op_0',
                                        name: 'Created By ID',
                                        value: 'CreatedBy',
                                        icon: 'addDate',
                                        type: 'OPTION'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Global Constants',
                type: 'CATEGORY',
                options: [
                    {
                        id: 'gb_cnst_id_0',
                        name: 'False',
                        value: 'False',
                        type: 'OPTION',
                        icon: 'boolean'
                    },
                    {
                        id: 'gb_cnst_id_1',
                        name: 'True',
                        value: 'True',
                        type: 'OPTION',
                        icon: 'boolean'
                    },
                    {
                        id: 'gb_cnst_id_2',
                        name: 'Blank Value (Empty String)',
                        value: 'Blank',
                        type: 'OPTION',
                        icon: 'default'
                    }
                ]
            },
            {
                name: 'Global Variables',
                type: 'CATEGORY',
                options: [
                    {
                        id: 'gb_var_id_0',
                        name: 'API',
                        value: 'API',
                        icon: 'api',
                        type: 'OPTION',
                        options: [
                            {
                                name: 'Relationship Fields',
                                type: 'CATEGORY',
                                options: [
                                    {
                                        id: 'gb_var_api_id_0',
                                        name: 'Created By ID',
                                        value: 'CreatedBy',
                                        type: 'OPTION',
                                        icon: 'addDate'
                                    },
                                    {
                                        id: 'gb_var_api_id_1',
                                        name: "D&B Company ID",
                                        value: 'D&BCompany',
                                        type: 'OPTION',
                                        icon: 'default'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'gb_var_id_1',
                        name: 'Custom Hierarchy Settings',
                        value: 'CustomHierarchySettings',
                        type: 'OPTION',
                        icon: 'hierarchy',
                        options: []
                    }
                ]
            }
        ]
    }
];

export default initialOptions;