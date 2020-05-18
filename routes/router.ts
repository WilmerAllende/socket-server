import { Router, Request, Response } from "express";
const router = Router();
router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Todo esta bien!!",
  });
});

router.post("/mensajes", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const des = req.body.des;

  res.json({
    ok: true,
    cuerpo,
    des,
  });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const des = req.body.des;
  const id = req.params.id;

  res.json({
    ok: true,
    cuerpo,
    des,
    id,
  });
});

export default router;
