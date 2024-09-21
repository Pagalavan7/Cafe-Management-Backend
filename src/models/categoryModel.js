import sql from "mssql";
export const insertCategory = async (name) => {
  try {
    const request = new sql.Request();
    await request
      .input("name", sql.NVarChar, name)
      .query("insert into Category values(@name)");
  } catch (err) {
    throw err;
  }
};

export const getAllCategory = async () => {
  try {
    const request = new sql.Request();
    const result = await request.query("select * from Category");
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

export const getCategoryById = async (id) => {
  try {
    const request = new sql.Request();
    const result = await request
      .input("id", sql.NVarChar, id)
      .query("select * from Category where categoryId=@id");
    return result.recordset[0];
  } catch (err) {
    throw err;
  }
};

export const updateCategoryModel = async (id, name) => {
  console.log("In update category model", id, name);
  try {
    if (!(await getCategoryById(id))) {
      throw new Error("Id not found.!");
    }
    const request = new sql.Request();
    const result = await request
      .input("name", sql.NVarChar, name)
      .input("id", sql.NVarChar, id)
      .query("update Category set name=@name where categoryId=@id");
    if (result.rowsAffected[0] == 0) {
      throw new Error("Update failed. 0 rows affected");
    }
  } catch (err) {
    throw err.message;
  }
};

export const deleteAllCategoryModel = async () => {
  try {
    const request = new sql.Request();
    await request.query("truncate table [Category]");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteCategoryModel = async (id) => {
  try {
    const request = new sql.Request();
    const result = await request
      .input("id", sql.Int, id)
      .query("delete from [Category] where categoryid = @id");
    if (result.rowsAffected[0] < 1) {
      throw new Error("Id not found! Can't delete category");
    }
  } catch (err) {
    console.log(err);
    throw err || err.message;
  }
};
