/** GET: /api/user/example123 */
const getUser = async (req, res) => {
  res.json('getUser route');
};

/** PUT: /api/user/updateuser 
 * @param: {
  "id" : "<userid>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
const updateUser = async (req, res) => {
  res.json('updateUser route');
};

module.exports = {
  getUser,
  updateUser,
};
