const Company = require("../models/CompanyModel");

module.exports = {
  //### Cadastra uma nova empresa
  async create(req, res) {
    const { name } = req.body;

    try {
      if (await Company.findOne({ name }))
        return res.status(400).send({ error: "Company already exits" });

      const newcompany = await Company.create(req.body);

      return res.status(200).send({ newcompany });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Lista os dados de todas as empresas
  async list(req, res) {
    try {
      const companys = await Company.find();

      if (!companys)
        return res.status(404).send({ error: "No registered companies" });

      return res.status(200).send({ companys });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Lista os dados de uma empresa específica
  async show(req, res) {
    try {
      const company = await Company.findById(req.params.companyId);

      if (!company) return res.status(404).send({ error: "Company not found" });

      return res.status(200).send({ company });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Altera os dados cadastrais de uma empresa
  async update(req, res) {
    const { name, address, email, contact_phone } = req.body;

    try {
      const company = await Company.findByIdAndUpdate(
        req.params.companyId,
        {
          name,
          address,
          email,
          contact_phone,
        },
        { new: true }
      );

      return res.status(200).send({ company });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },

  //### Deleta uma empresa específica
  async delete(req, res) {
    try {
      const company = await Company.findByIdAndRemove(req.params.companyId);

      if (!company) return res.status(404).send({ error: "Company not found" });

      return res.status(200).send({ Deleted: "Ok" });
    } catch (error) {
      return res.stauts(400).send({ error });
    }
  },
};
