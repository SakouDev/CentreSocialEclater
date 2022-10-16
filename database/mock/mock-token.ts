const tokens = [
    {
      id : 1,
      token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdE5hbWUiOiJWaWduZXJvbiIsImZpcnN0TmFtZSI6Ikx1YyIsImJpcnRoZGF5IjoiMjcvMDQvMTk5OSJ9.jw3a76N5UQ82Ag0IS39cgxUAeJHUtV2_S6W5T-S5m4Q",
      tokenPush : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdE5hbWUiOiJWaWduZXJvbiIsImZpcnN0TmFtZSI6Ikx1YyIsImJpcnRoZGF5IjoiMjcvMDQvMTk5OSJ9.jw3a76N5UQ82Ag0IS39cgxUAeJHUtV2_S6W5T-S5m4Q"
    },
    {
      id : 2,
      token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdE5hbWUiOiJGZXJybyIsImZpcnN0TmFtZSI6Ikx1YyIsImJpcnRoZGF5IjoiMjcvMDQvMTk5OSJ9.MAlWqeA_rTQ1SeXyaZk-pQ3R5_oz-u0LjnvlPGbCbyI",
      tokenPush : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdE5hbWUiOiJGZXJybyIsImZpcnN0TmFtZSI6Ikx1YyIsImJpcnRoZGF5IjoiMjcvMDQvMTk5OSJ9.MAlWqeA_rTQ1SeXyaZk-pQ3R5_oz-u0LjnvlPGbCbyI"
    },
    {
      id : 3,
      token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdE5hbWUiOiJNZW5mb3UiLCJmaXJzdE5hbWUiOiJNZW5mb3UiLCJiaXJ0aGRheSI6IjI3LzA0LzE5OTkifQ.RCXm4LLVR25TH92X2eMtOx6mgpZRPujKZBADjYYlupw",
      tokenPush : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdE5hbWUiOiJNZW5mb3UiLCJmaXJzdE5hbWUiOiJNZW5mb3UiLCJiaXJ0aGRheSI6IjI3LzA0LzE5OTkifQ.RCXm4LLVR25TH92X2eMtOx6mgpZRPujKZBADjYYlupw"
    },
    {
      id : 4,
      token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdE5hbWUiOiJsYWxhbGFsYSIsImZpcnN0TmFtZSI6ImxhbGFsYWxhIiwiYmlydGhkYXkiOiIyNy8wNC8xOTk5In0.d-Ngo7ZSFZDZMmEgwqokWerQkUytd_f8XcEo-0lwf_s",
      tokenPush : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdE5hbWUiOiJsYWxhbGFsYSIsImZpcnN0TmFtZSI6ImxhbGFsYWxhIiwiYmlydGhkYXkiOiIyNy8wNC8xOTk5In0.d-Ngo7ZSFZDZMmEgwqokWerQkUytd_f8XcEo-0lwf_s"
    },
    {
      id : 5,
      token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRvdG8iLCJzaXJldCI6MTIzNTY4OTQxMDAwNTZ9.zM1yPI9DTaqacH27DvNl37P6CWPJ6kseoRkZajKJrOw",
      tokenPush : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRvdG8iLCJzaXJldCI6MTIzNTY4OTQxMDAwNTZ9.zM1yPI9DTaqacH27DvNl37P6CWPJ6kseoRkZajKJrOw"
    },
    {
      id : 6,
      token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRhdGEiLCJzaXJldCI6MTIzNTY4OTQxMDAwNTV9.aDSNn7wQMFjDdi870DDa-S9l61RyWOj4o7wLjQ-Q2cg",
      tokenPush : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRhdGEiLCJzaXJldCI6MTIzNTY4OTQxMDAwNTV9.aDSNn7wQMFjDdi870DDa-S9l61RyWOj4o7wLjQ-Q2cg"
    },
    {
      id : 7,
      token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRpdGkiLCJzaXJldCI6MTIzNTY4OTQxMDAwNTR9.eGto-tyMsqfFu-oNFxxi4GHSVly7EGTlEiTruCYOUXw",
      tokenPush : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRpdGkiLCJzaXJldCI6MTIzNTY4OTQxMDAwNTR9.eGto-tyMsqfFu-oNFxxi4GHSVly7EGTlEiTruCYOUXw"
    },
]

module.exports = tokens;



// MenfouBeBetter

// Clé d'encodage JWT Token