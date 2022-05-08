const User = require("../database/User");

module.exports = {
    getAllUsers: (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const findObject = {};
        const ageFilter = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'name':
                    findObject.name = {$regex: `^${filters.name}`, $options: 'i'};
                    break;
                case 'role':
                    const rolesArr = filters.role.split(';');
                    findObject.role = { $in: rolesArr };
                    break;
                case 'age.gte':
                    Object.assign(ageFilter, {$gte: +filters['age.gte']});
                    findObject.age = {$or: []};
                    break;
                case 'age.lte':
                    Object.assign(ageFilter, {$lte: +filters['age.lte']});
                    findObject.age = {$or: []};
                    break;
            }
        });

        if (Object.values(ageFilter).length) {
            findObject.age = ageFilter;
        }

        console.log(JSON.stringify(filters, null, 2), 'Other Filters');

        const orderBy = order === 'asc' ? -1 : 1;

        return User.find(findObject)
            .limit(+perPage)
            .sort({ [sortBy]: orderBy })
            .skip((page - 1) * perPage);
    }
};
