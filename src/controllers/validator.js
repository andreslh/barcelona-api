const { Sequelize } = require('../models');

const validateNotRepeatedModel = async (model, { id, ...fields }, error) => {
  const entity = await model.findOne({
    where: {
      ...(id && {
        id: {
          [Sequelize.Op.not]: id,
        },
      }),
      ...fields,
    },
  });
  if (entity) {
    throw error;
  }
};

module.exports = {
  validateNotRepeatedModel,
};
