const { Op } = require('sequelize');

const { Table } = require('../../models');

const ORDER_TYPE_MAX = 2;

const formatStartDate = (date) => {
  const formattedStartDate = new Date(date);
  formattedStartDate.setHours(17);
  formattedStartDate.setMinutes(0);
  return formattedStartDate;
};

const formatEndDate = (date) => {
  const formattedEndDate = new Date(date);
  formattedEndDate.setDate(formattedEndDate.getDate() + 1);
  formattedEndDate.setHours(17);
  formattedEndDate.setMinutes(0);
  return formattedEndDate;
};

const getWaiterId = (waiterId, type) => {
  let filterWaiterId;
  if (waiterId) {
    filterWaiterId = {
      waiterId,
    };
  } else {
    const operation = type === 'tables' ? Op.gt : Op.lte;
    filterWaiterId = {
      waiterId: {
        [operation]: ORDER_TYPE_MAX,
      },
    };
  }
  return filterWaiterId;
};

const getClosed = async (req, res) => {
  try {
    const { startDate, endDate, type, waiterId } = req.body;

    const formattedStartDate = formatStartDate(startDate);
    const formattedEndDate = formatEndDate(endDate);

    const tables = await Table.findAll({
      where: {
        status: false,
        ...getWaiterId(waiterId, type),
        createdAt: {
          [Op.between]: [formattedStartDate, formattedEndDate],
        },
      },
    });
    return res.status(200).json({ tables });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getClosed;
