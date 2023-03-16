module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/graphql',
                destination: 'http://127.0.0.1:9090/graphql', // Matched parameters can be used in the destination
            },
        ];
    },
};