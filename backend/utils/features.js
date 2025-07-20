class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    const mongoQuery = {};

    const allowedOperators = ["gt", "gte", "lt", "lte"];

    for (let key in queryCopy) {
      if (key.includes("[")) {
        const [field, operator] = key.split(/\[|\]/).filter(Boolean);

        if (!allowedOperators.includes(operator)) continue; //skip unknown operators

        if (!mongoQuery[field]) mongoQuery[field] = {};
        mongoQuery[field][`$${operator}`] = Number(queryCopy[key]);
      } else {
        mongoQuery[key] = queryCopy[key];
      }
    }

    this.query = this.query.find(mongoQuery);
    console.log(mongoQuery);
    return this;
  }
}

module.exports = ApiFeatures;
