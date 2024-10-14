class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const otherField = ["page", "limit", "sort", "fields",'searchText'];
    otherField.forEach((el) => delete queryObj[el]);
    

    // advance filttering
    let advQuery = JSON.stringify(queryObj);
    
    advQuery = advQuery.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(advQuery));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paging() {
    console.log("======================= ----------------",this.queryString)
    const page = this.queryString.page * 1 || 1;

    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeature;
