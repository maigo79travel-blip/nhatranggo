import { sendContact } from "@/modules/support/service";
import { moduleError } from "@/modules/admin/http";
import { sameOrigin } from "@/lib/admin-auth";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  try {
    return Response.json(
      {
        id: await sendContact(await request.json()),
        message: "Đã nhận yêu cầu. Nhân viên sẽ liên hệ hỗ trợ.",
      },
      { status: 201 },
    );
  } catch (e) {
    return moduleError(e);
  }
}
