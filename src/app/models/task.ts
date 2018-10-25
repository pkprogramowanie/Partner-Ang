export interface Task {
title: string;
description?: string;
proposedEndDate?: Date;
status: Status;
coments: string;
done: boolean;
dateEnd?: Date;
tasks?: [
    {
        customer: {
                ID: string;
                place: string;
                phones?: [
                    { number: string;
                    label?: string;
                    }
                ];
                emails?: [
                { email: string;
                    label?: string;
                    primary?: boolean
                }
                ];
            };
        stage: {
            name: string;
            status: string;
            saveDate: Date;
            coments: string;
            done: boolean;
        };
        status: [
            {
                name: string;
                colour?: string;
            }
        ];
    }
];
}

enum Status {
    'Nieaktualne',
    'W przygotowaniu',
    'W takcie',
    'Wykonane',
}
