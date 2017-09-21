export const anonymousFormFields = [
    {
        type: 'input-text',
        children: [],
        id: 'firstname',
        required: true,
        values: {
            en: {
                children: [
                    {
                        cid: 'field',
                        field_type: 'text',
                        type: 'input',
                    },
                ],
                logic: 'AND',
                title: 'First Name\n',
            },
            fr: {
                children: [
                    {
                        cid: 'field',
                        field_type: 'text',
                        type: 'input',
                    },
                ],
                logic: 'AND',
                title: '[FR] First Name\n',
            },
        },
    },
    {
        type: 'input-text',
        children: [],
        id: 'lastname',
        required: true,
        values: {
            en: {
                children: [
                    {
                        cid: 'field',
                        field_type: 'text',
                        type: 'input',
                    },
                ],
                logic: 'AND',
                title: 'Last Name\n',
            },
            fr: {
                children: [
                    {
                        cid: 'field',
                        field_type: 'text',
                        type: 'input',
                    },
                ],
                logic: 'AND',
                title: '[FR] Last Name\n',
            },
        },
    },
    {
        type: 'input-text',
        children: [],
        id: 'email',
        required: true,
        values: {
            en: {
                children: [
                    {
                        cid: 'field',
                        field_type: 'email',
                        type: 'input',
                    },
                ],
                logic: 'AND',
                title: 'Email Address\n',
            },
            fr: {
                children: [
                    {
                        cid: 'field',
                        field_type: 'email',
                        type: 'input',
                    },
                ],
                logic: 'AND',
                title: '[FR] Email Address\n',
            },
        },
    },
];
