module.exports = {
    packagerConfig: {
        platform: 'darwin',
        arch: 'universal',
    },
    makers: [
        {
            name: '@electron-forge/maker-dmg',
            config: {},
        },
    ],
};
