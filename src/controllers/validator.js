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

const handleError = (error, res, errorMessage) =>
  error === errorMessage
    ? res.status(400).json({ message: error })
    : res.status(500).json({ message: error.message });

module.exports = {
  validateNotRepeatedModel,
  handleError,
};
