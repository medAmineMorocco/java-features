
export const javaVersions = ['9', '10', '11', '15', '17', '18']

const renderTitle = (title) => (
    <span>{title}</span>
);

const renderItem = (title) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
            {title}
        </div>
    ),
});

function groupBy(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
        if (!acc[currentValue[criteria]]) {
            acc[currentValue[criteria]] = [];
        }
        acc[currentValue[criteria]].push(currentValue);
        return acc;
    }, {});
    return newObj;
}

export const versionsColors = {
    '9': '#0096c7',
    '10': '#fb8500',
    '11': '#06d6a0',
    '15': '#432818',
    '17': '#e63946',
    '18': '#1d3557'
}

export const initialFeatures = [
    {
        title: 'Record',
        description: 'description',
        version: '17',
    },
    {
        title: 'Text Blocks',
        description: 'description',
        version: '15',
    },
    {
        title: 'Var',
        description: 'description',
        version: '9',
    },
    {
        title: 'Factory Methods',
        description: 'description',
        version: '18',
    },
    {
        title: 'Http Client',
        description: 'description',
        version: '10',
    },
    {
        title: 'InstanceOf',
        description: 'description',
        version: '11',
    }
];

export const options = Object.entries(groupBy(initialFeatures, 'version')).map(([key, value]) => {
    return {
        'label': renderTitle('Java ' + key),
        'options': value.map(({title}) => renderItem(title))
    }
});
